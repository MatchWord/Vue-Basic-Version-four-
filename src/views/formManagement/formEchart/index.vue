<template>
  <div class="contenter">
    <topCom :layoutData.sync="layoutData" @topComBack="topComBack" />
    <div class="editcontainer">
      <leftCom />
      <centerCom :layoutData.sync="layoutData" />
    </div>
  </div>
</template>
<script>
import topCom from './top/topCom'
import leftCom from './left/leftCom'
import centerCom from './center/centerCom'
export default {
  name: 'formEchart',
  components: {
    topCom,
    leftCom,
    centerCom
  },
  data () {
    return {
      layoutData : []
    }
  },
  mounted () {},
  methods: {
    topComBack (obj) {
      this.layoutData = obj
      console.log(111, obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.contenter {
  width: 100%;
  height: 100%;
  position: relative;
  .editcontainer {
    height: 85.5vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
  }
}
</style>

