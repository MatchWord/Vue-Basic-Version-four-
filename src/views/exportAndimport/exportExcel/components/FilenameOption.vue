<template>
  <div class="inlineBlock">
    <label class="radio-label">文件名称: </label>
    <el-input v-model="filename" :size="size" placeholder="请输入文件名（默认Excel列表）" style="width:345px;" prefix-icon="el-icon-document" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filename: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    size () {
      return this.$store.getters.size
    }
  }
}
</script>
<style lang="scss" scoped>
.inlineBlock {
  display: inline-block;
  margin-right: 30px;
  .radio-label {
    padding-left: 0;
    font-weight: 100;
  }
}
</style>
