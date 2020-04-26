<template>
  <div ref="chart3" class="chart3"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
const COM_NAME = 'DashChart3'
import EventBus from '@/components/eventBus'
import { barChar3Data } from '@/mock/chartData'
export default {
  name: 'DashChart3',
  components: {},
  props: {},
  data () {
    return {
      option: barChar3Data,
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
      const chart3 = this.$refs.chart3;
      if (chart3) {
        const myChart = this.myChart = this.$echarts.init(chart3);
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
.chart3 {
  width: 100%;
  height: 100%;
}
</style>