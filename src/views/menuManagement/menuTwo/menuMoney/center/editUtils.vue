<template>
  <div class="editor-container">
    <vue-ueditor-wrap v-model="messageContent" :config="ueditorConfig" @ready="editorReady" :destroy="true"></vue-ueditor-wrap>
    <div class="editor-custom-btn-container">
      <el-tooltip class="item" effect="light" content="支持:.jpg .png .gif格式 建议比例：16:9，小于10M" placement="top-start">
        <editorImage class="editor-upload-btn" :color="theme" :limitNum="50" @successCBK="imageSuccessCBK"/>
      </el-tooltip>
    </div>
    <div class="editor-video">
      <el-tooltip class="item" effect="light" content="视频，支持MP4格式" placement="top-start">
        <video-upload :color="theme"  @successCBK="videoUploadBack"/>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import VueUeditorWrap from 'vue-ueditor-wrap'
// 自定义组件
import editorImage from '@/components/Tinymce/components/EditorImage'
import videoUpload from '@/components/Tinymce/components/EditorVideo'
import { FILE_URL_CONFIG } from '@/config/settings'
export default {
  name: 'centerCom',
  components: {VueUeditorWrap, editorImage, videoUpload},
  props: {
    defaultVal: String
  },
  data () {
    return {
      messageContent: '',
      // 编辑器 ueditor
      ueditorInstance: null,
      ueditorConfig: {
        autoHeightEnabled: false,
        initialFrameWidth: 700,
        initialFrameHeight: 500,
        elementPathEnabled: false,
        scaleEnabled: false,
        imageScaleEnabled: false,
        autoFloatEnabled: false,
        imagePopup: true,
        toolbars: [
          ['undo', // 撤销
            'redo', // 重做
            '|',
            'fontsize', // 字号
            '|',
            'blockquote', // 引用
            'horizontal', // 分隔线
            '|',
            'removeformat', // 清除格式
            'formatmatch', // 格式刷
            '|',
            'link', // 超链接
            'unlink', // 取消链接
            'emotion' // 表情
          ],
          [
            'bold', // 加粗
            'italic', // 斜体
            'underline', // 下划线
            'strikethrough', // 删除线
            'forecolor', // 字体颜色
            'backcolor', // 背景色
            '|',
            'indent', // 首行缩进
            '|',
            'justifyleft', // 居左对齐
            'justifyright', // 居右对齐
            'justifycenter', // 居中对齐
            'justifyjustify', // 两端对齐
            '|',
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'lineheight', // 行间距
            '|',
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            '|',
            'imagenone', // 默认
            'imageleft', // 左浮动
            'imageright', // 右浮动
            'imagecenter', // 居中
            'music', // 音乐
            'attachment' // 附件
          ]
        ],
        UEDITOR_HOME_URL: '/ueditor1_4_3_3/'
      }
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    editorReady (editor) {
      this.ueditorInstance = editor
      this.ueditorInstance.setContent(this.messageContent)
      this.ueditorInstance.addListener('contentChange', () => {
        this.messageContent = this.convert()
        this.$emit('update:defaultVal', this.messageContent)
      })
    },
    // 查找正文img标签,添加属性
    convert () {
      let htmlText = this.ueditorInstance.getContent()
      let str = htmlText.replace(/<img[^>]*>/gi, function (match, capture) {
        return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
      })
      let str2 = str.replace(/<video[^>]*>/gi, function (match, capture) {
        return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
      })
      return str2
    },
    // 编辑器图片上传
    imageSuccessCBK (arr) {
      arr.forEach(v => {
        this.ueditorInstance.execCommand('inserthtml', `<img class="wscnph" style="max-width:100%;height:auto;" src="${v.url[0].httpImageUrl}" >`)
      })
    },
    // 视频上传
    videoUploadBack (url) {
      this.ueditorInstance.execCommand('inserthtml', `<p><video controls playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" style="width:100%;height:auto;object-fit:fill;" poster="${url[0].httpImageUrl}"  src="${url[0].httpImageUrl}" ></video></p>`)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-container{
  width: 98%;
  margin-bottom:8px;
  position: relative;
  .editor-custom-btn-container {
    position: absolute;
    top: 5px;
    right: 15px;
    z-index: 999999;
  }
  .editor-video {
    position: absolute;
    top: 5px;
    right: 100px;
    z-index: 999999;
  }
  ::v-deep {
    .edui-default .edui-editor {
      width: 100% !important;
    }
    #edui1_iframeholder {
      width: 100% !important;
    }
    .edui-default .edui-editor-iframeholder {
      width: 100% !important;
    }
  }
}
</style>

