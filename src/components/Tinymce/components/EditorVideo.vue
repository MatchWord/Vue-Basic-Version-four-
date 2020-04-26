<template>
  <div class="upload-container">
    <!-- :headers="isHasToken"
      :data="paramsData" -->
    <el-upload
      :multiple="false"
      class="editor-slide-upload"
      accept=".mp4,.rmvb,.mov,.mtv,.wmv,.avi"
      :file-list="fileList"
      :show-file-list="false"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      action="https://httpbin.org/post"
      :limit="1"
    >
      <el-button
        :style="{ background: theme, borderColor: theme }"
        icon="el-icon-upload"
        size="mini"
        type="primary"
        >上传视频
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "EditorVideo",
  props: {
    color: {
      type: String,
      default: "#1890ff"
    }
  },
  data() {
    return {
      listObj: {},
      fileList: []
    };
  },
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    handleSuccess(response, file) {
      let fileSizes = null;
      fileSizes += file.size;
      const isLt1M = fileSizes / 1024 / 1024 < 10;
      if (!isLt1M) {
        this.listObj = {};
        this.fileList = [];
      } else {
        const uid = file.uid;
        const objKeyArr = Object.keys(this.listObj);
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = response.data;
            this.listObj[objKeyArr[i]].hasSuccess = true;
            return;
          }
        }
        this.$emit("successCBK", response.files);
        this.listObj = {};
        this.fileList = [];
      }
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      console.log('file', file)
      let fileSizes = null;
      fileSizes += file.size;
      const isLt1M = fileSizes / 1024 / 1024 < 10;
      console.log('isLt1M', isLt1M)
      if (!isLt1M) {
        this.$message({
          message: `上传文件大小不能超过10MB!,请重新上传`,
          type: "error"
        });
      } else {
        const _self = this;
        const _URL = window.URL || window.webkitURL;
        const fileName = file.uid;
        this.listObj[fileName] = {};
        return new Promise(resolve => {
          const img = new Image();
          img.src = _URL.createObjectURL(file);
          img.onload = function() {
            _self.listObj[fileName] = {
              hasSuccess: false,
              uid: file.uid,
              width: this.width,
              height: this.height
            };
          };
          resolve(true);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
