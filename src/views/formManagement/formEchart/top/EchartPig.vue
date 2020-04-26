<template>
  <el-drawer title="图表样例" :visible.sync="drawerTwo"
    :direction="direction" :before-close="handleClose" size="310px">
    <common-wrapper :height="'90vh'">
      <div class="item-btn" v-for="item in echartPigList" :key="item.id"
      :style="{border: '1px solid' + theme  }" @click="echartPigClick(item)">
        <img class="img" :src="item.pigName" alt="找不到图片" srcset="">
      </div>
    </common-wrapper>
  </el-drawer>
</template>

<script>
import { echartAllPigList } from '../js/echartTypeList'
import { mapGetters } from 'vuex'
export default {
  name: 'EchartPig',
  data () {
    return {
      direction: 'rtl',
      echartPigList: []
    }
  },
  props: {
    drawerTwo: Boolean,
    pigParams: Object
  },
  computed: {
    ...mapGetters(['theme'])
  },
  mounted () {},
  watch: {
    drawerTwo: function (newVal, oldVal) {
      this.getData()
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('update:drawerTwo', false)
    },
    getData () {
      this.echartPigList = []
      echartAllPigList.length && echartAllPigList.filter(item => {
        if (item.id === this.pigParams.id) {
          this.echartPigList = item.children
        }
      })
    },
    echartPigClick (obj) {
      this.$emit('echartPigBack', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-btn {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin: 10px;
  float: left;
  cursor: pointer;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>


