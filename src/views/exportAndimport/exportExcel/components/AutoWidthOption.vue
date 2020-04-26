<template>
  <div class="inlineBlock">
    <label class="radio-label">宽度自适应: </label>
    <el-radio-group v-model="autoWidth" :size="size">
      <el-radio :label="true" border>
        True
      </el-radio>
      <el-radio :label="false" border>
        False
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    autoWidth: {
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
