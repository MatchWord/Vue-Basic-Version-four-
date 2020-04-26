<template>
  <div ref="chart1" class="chart1"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'DashChart1'
import EventBus from '@/components/eventBus'
import { barChar1Data } from '@/mock/chartData'
export default {
  name: 'DashChart1',
  components: {},
  props: {},
  data () {
    return {
      option: barChar1Data,
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
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.myChart = this.$echarts.init(chart1);
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
.chart1 {
  width: 100%;
  height: 100%;
}
</style>
