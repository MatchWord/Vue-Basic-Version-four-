<template>
  <div ref="runningMap" id="map"></div>
</template>
<script>
// 公用模块
import { mapGetters } from 'vuex'
import AMap from 'AMap'
import AMapUI from 'AMapUI'
// GPS转高德
// import {gps84ToGcj02} from '@/utils/debounce.js'

export default {
  name: 'formUpdate',
  components: {},
  props: {},
  data () {
    return {
      isVisible: false,
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
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    // 取消
    cancel () {
      // this.$emit('update:isRunningCircuit', false)
      // this.isVisible = false
      this.clearMap()
    },
    // 清除地图
    clearMap () {
      // this.runningMap.getOverlays().clear()
      this.runningMap && this.runningMap.destroy()
      this.$refs.runningMap.innerHTML = ''
      this.runningMap = null
    },
    // 初始化地图
    initMap () {
      // const params = {
      //   target: this.$refs.runningMap
      // }
      // this.runningMap = this.Map(params)
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
      // this.getData()
    },
    // 获取地图数据
    getData () {
      const params = {
        lineUuid: this.rowData[0].lineUuid,
        lineType: this.rowData[0].lineType
      }
      this.$api['loopScheduling.linemap.getStaMapList'](params).then(res => {
        const arrLine = res.sort((a, b) => {
          return a.sequence < b.sequence
        })
        const arrStation = res.filter(item => {
          return item.type * 1 === 1
        }).sort((a, b) => {
          return a.stationSeq < b.stationSeq
        })
        // 绘制线路
        this.drawLine(arrLine)
        // 绘制站点
        this.drawStation(arrStation)
        // 插入文本
        this.markerText(arrStation)
        // 插入起始站点
        this.markerUpandDown(arrStation)
      })
    },
    // 绘制线路
    drawLine (res) {
      var path = []
      if (res && res.length) {
        res.forEach(item => {
          // GPS转高德
          let latLngArr = gps84ToGcj02(item.lat * 1, item.lng * 1)
          path.push([latLngArr[1], latLngArr[0]])
        })
        var polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: this.randomColor(),
          borderWeight: 1,
          strokeColor: this.randomColor(),
          strokeOpacity: 1,
          strokeWeight: 2,
          // 折线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 10,
          showDir: true
        })
        polyline.setMap(this.runningMap)
        // 缩放地图到合适的视野级别
        this.runningMap.setFitView([ polyline ])
      }
    },
    // 绘制站点
    drawStation (res) {
      // 清除上次的圆
      if (this.buscircle && this.buscircle.length) {
        this.buscircle.forEach(item => {
          this.runningMap.remove(item)
        })
      }
      var path = []
      if (res && res.length) {
        res.forEach(item => {
          // GPS转高德
          let latLngArr = gps84ToGcj02(item.lat * 1, item.lng * 1)
          path.push([latLngArr[1], latLngArr[0]])
        })
        path.map(item => {
          let circle = new AMap.CircleMarker({
            map: this.runningMap,
            zIndex: 20,
            center: [item[0], item[1]],
            radius: 6, // 半径
            fillColor: '#ffffff',
            strokeWeight: 2,
            strokeColor: this.randomColor()
          })
          circle.setMap(this.runningMap)
        })
      }
    },
    // 插入文本
    markerText (res) {
      // 清除上次的文本
      if (this.bustext && this.bustext.length) {
        this.bustext.forEach(item => {
          this.runningMap.remove(item)
        })
      }
      var path = []
      if (res && res.length) {
        res.forEach(item => {
          // GPS转高德
          let latLngArr = gps84ToGcj02(item.lat * 1, item.lng * 1)
          path.push([latLngArr[1], latLngArr[0], item.stationName])
        })
        path.map(item => {
          let text = new AMap.Text({
            map: this.runningMap,
            text: item[2],
            position: [item[0], item[1]],
            textAlign: 'center', // 'left' 'right', 'center',
            verticalAlign: 'middle', // middle 、bottom
            offset: new AMap.Pixel(0, 25),
            cursor: 'pointer',
            zIndex: 20,
            autoRotation: true, // 是否自动旋转。
            clickable: true,
            style: {
              'padding': '0.2rem 0.5rem',
              'margin-bottom': '0.3rem',
              'border-radius': '.25rem',
              'background-color': this.randomColor(),
              'min-width': '100px',
              'border-width': 0,
              'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
              'text-align': 'center',
              'font-size': '12px',
              'color': '#ffffff'
            }
          })
          text.setMap(this.runningMap)
        })
      }
    },
    // 插入起始站点
    markerUpandDown (res) {
      if (res && res.length) {
        const up = res[0]
        const down = res[res.length - 1]
        // GPS转高德
        let latLngArrup = gps84ToGcj02(up.lat * 1, up.lng * 1)
        // GPS转高德
        let latLngArrdown = gps84ToGcj02(down.lat * 1, down.lng * 1)
        let markerup = new AMap.Marker({
          icon: '//webapi.amap.com/theme/v1.3/markers/n/start.png',
          position: [latLngArrup[1], latLngArrup[0]],
          offset: new AMap.Pixel(-13, -30)
        })
        let markerdown = new AMap.Marker({
          icon: '//webapi.amap.com/theme/v1.3/markers/n/end.png',
          position: [latLngArrdown[1], latLngArrdown[0]],
          offset: new AMap.Pixel(-13, -30)
        })
        markerup.setMap(this.runningMap)
        markerdown.setMap(this.runningMap)
      }
    },
    // 随机颜色
    randomColor () {
      /** 随机产生十六进制的颜色值 */
      let i = 0
      let str = '#'
      let random = 0
      let aryNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
      for (i = 0; i < 6; i++) {
        random = parseInt(Math.random() * 16)
        str += aryNum[random]
      }
      if (str === '#FFFFFF') {
        this.randomColor()
      }
      return str
    }
  }
}
</script>
<style lang="scss" scoped>
#map{
  height: 90vh;
}
</style>