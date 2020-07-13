<template>
  <canvas ref="clock"></canvas>
</template>
<script>
// import {mapGetters} from 'vuex'
import clock from './lib/clock'

export default {
  name: 'canvasClock',
  props: {
    size: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      clockRef: null
    }
  },
  // computed: {
  //   ...mapGetters(['theme'])
  // },
  // watch: {
  //   theme (theme) {
  //     this.initClock(theme)
  //   }
  // },
  mounted () {
    const clockRef = this.$refs.clock
    clockRef.setAttribute('width', this.size + 'px')
    clockRef.setAttribute('height', this.size + 'px')
    this.clockRef = clockRef.getContext('2d')
    this.initClock()
  },
  methods: {
    initClock () {
      clock({
        el: this.clockRef,
        size: this.size,
        option: {
          indicate_color: '#757575', // 表盘
          dial2_color: '#CFD8DC', // 分针
          dial3_color: '#CFD8DC', // 时针
          dial1_color: '#757575', // 秒针
          bg_color: 'rgba(0,0,0,0)'
        }
      })
    }
  }
}
</script>
