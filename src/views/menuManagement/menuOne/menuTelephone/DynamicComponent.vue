<template>
  <component :is="componentLoader" class="component-wrapper"/>
</template>
<script>
/**
 * Dynamic component loader
 * 动态加载预设组件;
 */
export default {
  name: 'DynamicComponent',
  props: {
    com: {
      type: String,
      required: true
    }
  },
  computed: {
    componentLoader () {
      return () => import(`./Components/${this.com}.vue`)
    }
  }
}
</script>
<style scoped>
.component-wrapper{
  flex:1 auto;
  width:100%;
  height:100%;
}
</style>