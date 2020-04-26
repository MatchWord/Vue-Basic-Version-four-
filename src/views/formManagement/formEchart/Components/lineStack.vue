<template>
  <div ref="lineStack" class="lineStack"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'lineStack'
import EventBus from '@/components/eventBus'
import { lineStack } from './../js/chartData'
export default {
  name: 'lineStack',
  components: {},
  props: {},
  data () {
    return {
      option: lineStack,
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
      const lineStack = this.$refs.lineStack;
      if (lineStack) {
        const myChart = this.myChart = this.$echarts.init(lineStack)
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
.lineStack {
  width: 100%;
  height: 100%;
}
</style>
