<template>
  <div class="notification-center"
  :class="{ dark: notificationInfo.dark }"
  :style="{
    transform: showSettings ? 'translateX(0)' : `translateX(${notificationInfo.Width}px)`,
    width: `${notificationInfo.Width}px`
  }">
    <transition name="slide-to-left" :duration="2500">
      <div class="wrapper" v-show="fadeToShow">
        <!-- 内容区域,侧边栏并不常用，因此这里需要v-if隐藏时将组件动态移除掉，减少后台无谓消耗 -->
          <component :is="sectionComp" v-if="showSettings" />
      </div>
    </transition>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapGetters } from "vuex";
export default {
  name: 'NotificationBar',
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapGetters(["showSettings"]),
    sectionComp () {
      return this.notificationInfo.component
    }
  },
  props: {
    notificationInfo: {
      type: Object
    }
  },
  data () {
    return {
      fadeToShow: false
    }
  },
  methods: {},
  watch: {
    showSettings: {
      handler (isOpen) {
        if (isOpen) {
          setTimeout(() => { this.fadeToShow = true }, 100)
        } else {
          setTimeout(() => { this.fadeToShow = false }, 100)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-center {
  position: fixed;
  height:100%;
  top: 0;
  right:0;
  z-index:2950;
  background-color:rgba(255,255,255,.93);
  box-shadow: 0 0 5px rgba(0,0,0,.13), 0 0 15px rgba(0,0,0,.1), 0 0 25px rgba(0,0,0,.07);
  transition: transform .6s cubic-bezier(0,.69,.0,1) 0s;
  &.dark {
    background-color: rgba(0,0,0, 0.8);
  }
  .wrapper {
    height:100%;
    display: flex;
    flex-direction: column;
    opacity: 1;
    transform: translateX(0);
    transition: all .5s ease;

    &.slide-to-left-enter,
    &.slide-to-left-leave-to {
      opacity: 0;
      transform: translateX(40px);
    }
    &.slide-to-left-enter-to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>

