<template>
  <div class="topWrapper">
    <el-button-group>
      <el-button type="primary" icon="el-icon-circle-plus" @click="echartTypeShow"></el-button>
      <el-button type="primary" icon="el-icon-edit"></el-button>
    </el-button-group>
    <EchartType :drawerOne.sync="drawerOne" @echartTypeBack="echartTypeBack" />
    <EchartPig :drawerTwo.sync="drawerTwo" :pigParams="pigParams" @echartPigBack="echartPigBack" />
    <EchartDialog :isShowdialog.sync="isShowdialog" :comParams="comParams" :layoutData="layoutData" @layoutDataBack="layoutDataBack" />
  </div>
</template>

<script>
import EchartType from './EchartType'
import EchartPig from './EchartPig'
import EchartDialog from './EchartDialog'
export default {
  name: 'topCom',
  props: {
    layoutData: Array
  },
  data () {
    return {
      drawerOne: false,
      drawerTwo: false,
      pigParams: {},
      isShowdialog: false,
      comParams: {}
    }
  },
  components: {
    EchartType,
    EchartPig,
    EchartDialog
  },
  mounted () {},
  methods: {
    // 类型展示
    echartTypeShow () {
      this.drawerOne = true
    },
    // 类型展示返回数据 => 样例展示
    echartTypeBack (item) {
    this.pigParams = item
    this.drawerTwo = true
    },
    // 样例展示返回数据 => 模块对象
    echartPigBack (obj) {
      this.comParams = obj
      this.isShowdialog = true
    },
    layoutDataBack (obj) {
      this.$emit('topComBack', obj)
      this.drawerOne = false
      this.drawerTwo = false
    }
  }
}
</script>
<style lang="scss" scoped>
.topWrapper {
  width: auto;
  height: auto;
  padding: 5px 10px;
  border-bottom: 1px solid #f1f1f1;
}
/deep/.el-drawer__header {
  margin-bottom: 15px !important;
}
</style>


