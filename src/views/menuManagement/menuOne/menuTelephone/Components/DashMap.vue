<template>
  <div ref="runningMap" id="map"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
import AMap from 'AMap'
import AMapUI from 'AMapUI'

export default {
  name: 'DashMap',
  components: {},
  props: {},
  data () {
    return {
      rowObj: {},
      runningMap: null,
      busmarker: [],
      buscircle: [],
      bustext: []
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  watch: {},
  mounted () {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    // 初始化地图
    initMap () {
      this.runningMap = new AMap.Map(this.$refs.runningMap, {
        resizeEnable: true,
        center: [108.9398400000, 34.3412700000], // 地图中心点
        zoom: 15,
        minZoom: 9,
        maxZoom: 18 // 地图显示的缩放级别
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        let toolbar = new AMap.ToolBar()
        this.runningMap.addControl(toolbar)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#map{
  width: 100%;
  height: 100%;
}
</style>
