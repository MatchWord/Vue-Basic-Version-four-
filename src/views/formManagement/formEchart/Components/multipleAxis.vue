<template>
  <div ref="multipleAxis" class="multipleAxis"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'multipleAxis'
import EventBus from '@/components/eventBus'
import { multipleAxis } from './../js/chartData'
export default {
  name: 'multipleAxis',
  components: {},
  props: {},
  data () {
    return {
      option: multipleAxis,
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
      const multipleAxis = this.$refs.multipleAxis;
      if (multipleAxis) {
        const myChart = this.myChart = this.$echarts.init(multipleAxis)
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
.multipleAxis {
  width: 100%;
  height: 100%;
}
</style>
