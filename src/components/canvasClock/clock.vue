<template>
  <canvas ref="drawing" :width="size" :height="size"></canvas>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'canvasClock',
  data () {
    return {
      size: 150,
      clockRef: null,
      width: '',
      height: '',
      radius: ''
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  mounted () {
    const clockRef = this.$refs.drawing
    this.clockRef = clockRef.getContext('2d')
    this.width = this.size
    this.height = this.size
    this.radius = this.size / 2
    this.draw()
    setInterval(this.draw, 1000)
  },
  methods: {
    drawBackground() {
      this.clockRef.save();
      this.clockRef.translate(this.radius, this.radius);
      this.clockRef.beginPath();
      this.clockRef.lineWidth = 10;
      this.clockRef.font ='18px Arial';
      this.clockRef.textAlign = 'center'
      this.clockRef.textBaseline = 'middle'
      this.clockRef.arc(0, 0, this.radius - 5, 0, 2 * Math.PI, false);
      this.clockRef.stroke();
      var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
      // 遍历获取坐标
      hourNumbers.forEach((number, i) => {
          var rad = (2 * Math.PI / 12) * i;
          var x = Math.cos(rad) * (this.radius - 30);
          var y = Math.sin(rad) * (this.radius - 30);
          this.clockRef.fillStyle = '#fff';
          this.clockRef.fillText(number, x ,y);
      })
      //定义刻度
      for(var i = 0; i < 60; i++){
        var rad = (2 * Math.PI / 60) * i;
        var x = Math.cos(rad) * (this.radius - 18);
        var y = Math.sin(rad) * (this.radius - 18);
        this.clockRef.beginPath();
        if(i % 5 == 0){
            this.clockRef.arc(x, y, 2, 0, 2 * Math.PI, false);
            this.clockRef.fillStyle = this.theme;
        }else{
            this.clockRef.arc(x, y, 2, 0, 2 * Math.PI, false);
            this.clockRef.fillStyle = '#ccc';
        }
        this.clockRef.fill();
      }
    },
    //定义时钟
    drawHour(hour,minute){
        this.clockRef.save();
        this.clockRef.beginPath();
        var rad = 2 * Math.PI / 12 * hour;
        var mrad = 2 * Math.PI / 12 / 60 * minute;
        this.clockRef.rotate(rad + mrad);
        this.clockRef.lineWidth = 6;
        this.clockRef.lineCap= 'round';
        this.clockRef.moveTo(0 ,10);
        this.clockRef.lineTo(0 ,-this.radius / 2);
        this.clockRef.stroke();
        this.clockRef.restore();
    },
    //定义分钟
    drawMinute(minute,second){
      this.clockRef.save();
      this.clockRef.beginPath();
      var rad = 2 * Math.PI / 60 * minute;
      var srad = 2 * Math.PI / 60 /60 * second;
      this.clockRef.rotate(rad + srad);
      this.clockRef.lineWidth = 3;
      this.clockRef.lineCap= 'round';
      this.clockRef.moveTo(0 ,10);
      this.clockRef.lineTo(0 ,-this.radius + 18);
      this.clockRef.stroke();
      this.clockRef.restore();
    },
    //定义秒钟
    drawSecond(second){
      this.clockRef.save();
      this.clockRef.beginPath();
      var rad = 2 * Math.PI / 60 * second;
      this.clockRef.rotate(rad);
      this.clockRef.lineWidth = 3;
      this.clockRef.lineCap= 'round';
      this.clockRef.moveTo(-2 ,20);
      this.clockRef.lineTo( 2, 20);
      this.clockRef.lineTo( 1, -this.radius + 18);
      this.clockRef.lineTo( -1, -this.radius + 18);
      this.clockRef.fillStyle = '#c14543';
      this.clockRef.fill();
      this.clockRef.restore();
    },
    //定义钟盘圆点样式
    drawDot(){
      this.clockRef.beginPath();
      this.clockRef.fillStyle = '#fff';
      this.clockRef.arc(0, 0, 3, 0, 2 * Math.PI, false);
      this.clockRef.fill();
    },
    //时间函数
    draw() {
      this.clockRef.clearRect(0, 0, this.width, this.height);
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      this.drawBackground();
      this.drawHour(hour,minute);
      this.drawMinute(minute,second);
      this.drawSecond(second);
      this.drawDot();
      this.clockRef.restore();
    }
  }
}
</script>
