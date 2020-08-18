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
              <div class="ant-form-item-label">占位符</div>
              <div class="ant-form-item-control-wrapper">
                <el-input size="mini" v-model="activeCenterBackData.placeholder"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'editEditUtils',
  components: {},
  props: {
    activeCenterData: Object
  },
  data () {
    return {
      activeCenterBackData: []
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
    'activeCenterBackData.placeholder': function (val, old) {
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
      }
    }
  }
}
</style>
