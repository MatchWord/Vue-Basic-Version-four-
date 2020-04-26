<template>
  <div ref="lineSmooth" class="lineSmooth"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'lineSmooth'
import EventBus from '@/components/eventBus'
import { lineSmooth } from './../js/chartData'
export default {
  name: 'lineSmooth',
  components: {},
  props: {},
  data () {
    return {
      option: lineSmooth,
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
      const lineSmooth = this.$refs.lineSmooth;
      if (lineSmooth) {
        const myChart = this.myChart = this.$echarts.init(lineSmooth)
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
.lineSmooth {
  width: 100%;
  height: 100%;
}
</style>
