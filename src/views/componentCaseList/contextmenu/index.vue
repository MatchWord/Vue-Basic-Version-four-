<template>
  <div class="page">
    <v-contextmenu ref="menu" @beforeShow="beforeShow">
      <v-contextmenu-item>菜单1</v-contextmenu-item>
      <v-contextmenu-item>菜单2</v-contextmenu-item>
      <v-contextmenu-item>菜单3</v-contextmenu-item>
    </v-contextmenu>
    <div class="contextmenu-box">
      <div v-contextmenu:menu="tab">右键点击此区域</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'contextmenu',
  components: {},
  props: {},
  data () {
    return {
      tab: {name: '胡歌', sex: '男', age: '36'}
    }
  },
  created () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    beforeShow (vm, events, params) {
      console.log(vm, events, params)
    }
  }
}
</script>
<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
  .contextmenu-box {
    margin: 10px;
  }
}
</style>



