<template>
  <div ref="chart4" class="chart4"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'DashChart4'
import EventBus from '@/components/eventBus'
import { barChar4Data } from '@/mock/chartData'
export default {
  name: 'DashChart4',
  components: {},
  props: {},
  data () {
    return {
      option: barChar4Data,
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
      const chart4 = this.$refs.chart4;
      if (chart4) {
        const myChart = this.myChart = this.$echarts.init(chart4);
        myChart.setOption(this.option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
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
.chart4 {
  width: 100%;
  height: 100%;
}
</style>