<template>
  <div class="container">
    <form>
      <div class="section-container">
        <div class="section-title">{{activeCenterBackData.name}}</div>
        <div class="section-collapse_container">
          <div class="section-content">
            <div class="ant-form-item">
              <div class="ant-form-item-label">标题</div>
              <div class="ant-form-item-control-wrapper">
                <el-input size="mini" v-model="activeCenterBackData.title" :placeholder="activeCenterBackData.titlePlaceholder"></el-input>
              </div>
            </div>
            <div class="ant-form-item">
              <div class="ant-form-item-label">默认值</div>
              <div class="ant-form-item-control-wrapper">
                <el-input size="mini" type="textarea" :rows="3" v-model="activeCenterBackData.defaultVal"></el-input>
              </div>
            </div>
            <div class="ant-form-item">
              <div class="ant-form-item-label">占位符</div>
              <div class="ant-form-item-control-wrapper">
                <el-input size="mini" v-model="activeCenterBackData.placeholder"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="section-title">校验</div>
        <div class="section-collapse_container">
          <div class="section-content">
            <div class="ant-form-item">
              <el-checkbox v-model="activeCenterBackData.isMustFill">必须填</el-checkbox>
            </div>
            <div class="ant-form-item">
              最少填 <el-input-number size="mini" v-model="activeCenterBackData.minVal"></el-input-number> 个字
            </div>
            <div class="ant-form-item">
              最多填 <el-input-number size="mini" v-model="activeCenterBackData.maxVal"></el-input-number> 个字
            </div>
          </div>
        </div>
        <div class="section-title">布局设置</div>
        <div class="section-collapse_container">
          <div class="section-content">
            <div class="ant-form-item">
              宽度占用整行的<el-select v-model="activeCenterBackData.widthPos" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'editTextarea',
  components: {},
  props: {
    activeCenterData: Object
  },
  data () {
    return {
      activeCenterBackData: [],
      options: [
        {label: '1/4', value: '0.25'},
        {label: '2/4', value: '0.5'},
        {label: '3/4', value: '0.75'},
        {label: '4/4', value: '1.0'}
      ]
    }
  },
  mounted () {
    this.activeCenterBackData = this.activeCenterData
  },
  watch: {
    activeCenterData (newVal) {
      this.activeCenterBackData = newVal
    },
    'activeCenterBackData.title': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.defaultVal': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.placeholder': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.isMustFill': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.minVal': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.maxVal': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    },
    'activeCenterBackData.widthPos': function (val, old) {
      this.$emit('rightBackClick', this.activeCenterBackData)
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.section-container {
  .section-title {
    font-weight: 600;
    background-color: #fff;
    padding: 4px 14px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    text-transform: capitalize;
  }
  .section-collapse_container {
    .section-content {
      padding: 14px;
      .ant-form-item {
        font-size: 14px;
        margin-bottom: 14px;
        .ant-form-item-label {
          margin-bottom: 4px;
        }
        .ant-form-item-control-wrapper {

        }
      }
    }
  }
}
</style>
