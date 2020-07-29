<template>
  <div class="global-mask" v-show="showSettings"
  :class="{ darkness: darkModel }"
  :style="{ zIndex: zIndex }"
  @click="setMaskHidden"></div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapGetters } from "vuex";
export default {
  name: 'GlobalMask',
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapGetters(["showSettings"])
  },
  props: {
    zIndex: {
      type: Number,
      default: 1100
    },
    darkModel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setMaskHidden () {
      this.$store.dispatch('settings/changeSetting', {
        key: 'showSettings',
        value: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.global-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width:100%;
  height:100%;
  overflow: hidden;
  opacity: 0;

  &.darkness {
    background-color: rgba(0,0,0,0.2);
    opacity: .7;
  }
}
</style>

