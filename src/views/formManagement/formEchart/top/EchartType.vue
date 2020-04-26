<template>
  <el-drawer title="图表类型" :visible.sync="drawerOne"
    :direction="direction" :before-close="handleClose" size="310px">
    <common-wrapper :height="'90vh'">
      <div class="item-btn" v-for="item in echartTypeList" :key="item.id"
      :style="{border: '1px solid' + theme  }" @click="echartTypeClick(item)">
        {{item.name}}
      </div>
    </common-wrapper>
  </el-drawer>
</template>

<script>
import { echartTypeList } from '../js/echartTypeList'
import { mapGetters } from 'vuex'
export default {
  name: 'EchartType',
  data () {
    return {
      direction: 'rtl',
      echartTypeList: []
    }
  },
  props: {
    drawerOne: Boolean
  },
  computed: {
    ...mapGetters(['theme'])
  },
  mounted () {
    this.echartTypeList = echartTypeList
  },
  methods: {
    handleClose(done) {
      this.drawer = false
      this.$emit('update:drawerOne', false)
    },
    echartTypeClick (item) {
      this.$emit('echartTypeBack', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-btn {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  // border: 1px solid #f4f4f5;
  border-radius: 3px;
  margin: 10px;
  float: left;
  cursor: pointer;
}
</style>


