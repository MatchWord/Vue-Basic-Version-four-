<template>
  <div
    class="common-wrapper"
    v-bind:class="{ full: full, ten: ten }"
    v-bind:style="{ width: width, height: height }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "CommonWrapper",
  props: {
    full: Boolean,
    ten: Boolean,
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    }
  }
};
</script>
<style lang="scss" scoped>
.common-wrapper {
  width: auto;
  padding: 5px;
  margin: 5px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #d9d9d9;

  &.full {
    padding: 0 !important;
    border: none !important;
  }
  &.ten {
    padding: 10px !important;
  }
}
</style>
