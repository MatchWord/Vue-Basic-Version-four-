<template>
  <div class="edit-box">
    <div class="edit-left">
      <common-wrapper>
        <el-form class="form-container" ref="articlesForm" :model="articlesForm" :rules="formRules">
          <el-scrollbar tag="section" wrap-class="scrollbar-wrapper">
            <el-row>
              <el-form-item label-width="51px" prop="messageTitle" label="标题">
                <input type="text" v-model="articlesForm.messageTitle" class="inputStyle"/>
                <span class="word-counter">{{(articlesForm.messageTitle && articlesForm.messageTitle.length) || 0}}/64字</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label-width="50px" prop="messageAuthor" label="作者">
                <input type="text" v-model="articlesForm.messageAuthor" class="inputStyle" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label-width="50px" prop="messageDigest" label="摘要">
                <el-input type="textarea" v-model="articlesForm.messageDigest" :rows="2" placeholder="请输入摘要内容"
                  class="textareaStyle"></el-input>
              </el-form-item>
            </el-row>
            <div class="editor-container">
              <tinymce v-model="content" :value="content" :height="400" />
            </div>
            <el-row>
              <el-form-item label-width="69px" prop="messageContentSourceUrl" label="原文地址">
                <input v-model="articlesForm.messageContentSourceUrl" class="inputStyle" />
              </el-form-item>
            </el-row>
          </el-scrollbar>
        </el-form>
      </common-wrapper>
    </div>
    <div class="edit-right">
      <div class="preview">
        <div class="phone">
          <div class="phone-inner">
            <div class="articleTitle" v-html="articlesForm.messageTitle"></div>
            <div class="articleAuthor">
              <span style="margin-right:36px;" v-html="articlesForm.messageAuthor"></span>
            </div>
            <div class="articleContent" v-html="content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 自定义组件
import Tinymce from "@/components/Tinymce";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    const validateWord = (rule, value, callback) => {
      if (value.length > 64) {
        callback(new Error("标题字数不超过64"));
      } else {
        callback();
      }
    };
    return {
      content: ``,
      articlesForm: {
        messageTitle: "", // 标题 必须
        messageAuthor: "", // 作者   否
        messageDigest: "", // 摘要   否
        messageContent: "",
        messageContentSourceUrl: "" // 图文消息的原文地址 必须
      },
      formRules: {
        // 表单验证
        messageTitle: [
          { required: true, message: "标题必须填", trigger: "blur" },
          { validator: validateWord }
        ],
        messageDigest: [
          { min: 1, max: 120, message: "摘要内容不超过120字", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    // 新增素材
    submitAdd() {
      this.$refs.articlesForm.validate(valid => {
        if (valid) {
          this.articlesForm.messageContent = this.content;
          let params = Object.assign({}, this.articlesForm);
          if (!params.messageContent) {
            this.$message({message: "正文内容为必填,请填写！",type: "warning"});
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  .edit-left {
    width: 55vw;
    height: 87vh;
    float: left;
    .form-container {
      width: auto;
      height: 80vh;
      padding: 10px;
      overflow: hidden;
      .inputStyle {
        width: 98%;
        border: none;
        outline: none;
        border-bottom: 1px solid #ddd;
        position: relative;
      }
      .word-counter {
        width: 63px;
        position: absolute;
        right: 13px;
        top: 0px;
        font-size: 14px;
        color: #606266;
      }
      .textareaStyle {
        width: 98%;
      }
      .editor-container {
        width: 98%;
        margin-bottom: 8px;
        position: relative;
      }
      .coverPicUrl {
        margin-top: 3px;
      }
    }
  }
  .edit-right {
    width: 43vw;
    height: auto;
    float: left;
    position: relative;
    .preview {
      height: 100%;
      text-align: center;
      -webkit-transition: opacity 0.3s;
      z-index: 1000;
      font-size: 17px;
      .previewTitle {
        color: #7383bf;
        width: 355px;
        height: 28px;
        text-align: left;
      }
      .phone {
        position: absolute;
        top: 30px;
        right: 50%;
        transform: translateX(200px);
        width: 400px;
        height: 811px;
        overflow: hidden;
        background: url("../../../assets/images/phone-w2.png") no-repeat;
        background-size: 92% 88%;
        .phone-inner {
          position: absolute;
          top: 100px;
          left: 30px;
          width: 315px;
          height: 508px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 13px 1px;
          .articleTitle {
            font-size: 22px;
            line-height: 1.4;
            margin-bottom: 14px;
            text-align: center;
          }
          .articleAuthor {
            color: #566a94;
            font-size: 16px;
            text-align: center;
            margin-bottom: 22px;
            line-height: 20px;
          }
          .buttonBack {
            position: absolute;
            margin-left: 26%;
            font-size: 16px;
            color: #333;
            right: 64px;
          }
          .articleContent {
            letter-spacing: 1px;
            img {
              max-width: 100%;
              height: auto !important;
            }
          }
        }
        .closePhone {
          position: absolute;
          right: 0;
          top: 16%;
          font-size: 22px;
          color: #f8f8f8;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style>
.articleContent img {
  max-width: 100% !important;
  height: auto !important;
}
</style>
