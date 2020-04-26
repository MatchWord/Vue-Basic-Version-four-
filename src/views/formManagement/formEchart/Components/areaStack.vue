<template>
  <div ref="areaStack" class="areaStack"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'areaStack'
import EventBus from '@/components/eventBus'
import { areaStack } from './../js/chartData'
export default {
  name: 'areaStack',
  components: {},
  props: {},
  data () {
    return {
      option: areaStack,
      myChart: null
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  mounted () {
    this.$nextTick(() => {
      this.getEchartData1()
    })
    window.addEventListener('resized', this.resizeChart)
    // watch and resize chart
    EventBus.$on('resized', item => {
      if (item.component === COM_NAME) this.resizeChart()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resized', this.resizeChart)
    EventBus.$off('resized')
  },
  methods: {
    getEchartData1() {
      const areaStack = this.$refs.areaStack;
      if (areaStack) {
        const myChart = this.myChart = this.$echarts.init(areaStack)
        myChart.setOption(this.option)
        window.addEventListener("resize", function() {
          this.myChart.resize()
        })
      }
    },
    resizeChart () {
      setTimeout(() => {
        this.myChart.resize()
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
.areaStack{
  width: 100%;
  height: 100%;
}
</style>