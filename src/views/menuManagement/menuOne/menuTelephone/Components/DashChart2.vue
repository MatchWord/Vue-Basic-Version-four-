<template>
  <div ref="chart2" class="chart2"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'DashChart2'
import EventBus from '@/components/eventBus'
import { barChar2Data } from '@/mock/chartData'
export default {
  name: 'DashChart2',
  components: {},
  props: {},
  data () {
    return {
      option: barChar2Data,
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
      const chart2 = this.$refs.chart2;
      if (chart2) {
        const myChart = this.myChart = this.$echarts.init(chart2);
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
.chart2 {
  width: 100%;
  height: 100%;
}
</style>