<template>
  <div ref="lineSimple" class="lineSimple"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'lineSimple'
import EventBus from '@/components/eventBus'
import { lineSimple } from './../js/chartData'
export default {
  name: 'lineSimple',
  components: {},
  props: {},
  data () {
    return {
      option: lineSimple,
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
      const lineSimple = this.$refs.lineSimple;
      if (lineSimple) {
        const myChart = this.myChart = this.$echarts.init(lineSimple)
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
.lineSimple {
  width: 100%;
  height: 100%;
}
</style>
