<template>
  <div ref="lineMarker" class="lineMarker"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'lineMarker'
import EventBus from '@/components/eventBus'
import { lineMarker } from './../js/chartData'
export default {
  name: 'lineMarker',
  components: {},
  props: {},
  data () {
    return {
      option: lineMarker,
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
      const lineMarker = this.$refs.lineMarker;
      if (lineMarker) {
        const myChart = this.myChart = this.$echarts.init(lineMarker)
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
.lineMarker {
  width: 100%;
  height: 100%;
}
</style>