<template>
  <div class="page">
    <common-wrapper>包装器不传入任何参数</common-wrapper>
    <common-wrapper :full="true">包装器传入参数full</common-wrapper>
    <common-wrapper :ten="true">包装器传入参数ten</common-wrapper>
    <common-wrapper :width="'700px'" :height="'100px'">
      包装器传入参数width='700px',height='100px'
    </common-wrapper>
    <common-wrapper :width="'80%'" :height="'20%'">
      包装器传入参数width='80%',height='20%',高度设置%是无效的
    </common-wrapper>
    <common-wrapper :width="'80vw'" :height="'20vh'">
      包装器传入参数width='80vw',height='20vh',vw最大为100vw, vh最大为100vh
    </common-wrapper>
  </div>
</template>
<script>
export default {
  name: "wrapper",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
