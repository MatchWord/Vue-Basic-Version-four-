<template>
  <div class="inlineBlock">
    <label class="radio-label">文本类型: </label>
    <el-select v-model="bookType" style="width:120px;" :size="size">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'xlsx'
    }
  },
  // options see: https://github.com/SheetJS/js-xlsx#supported-output-formats
  data() {
    return {
      options: ['xlsx', 'xlsm', 'xlsb', 'biff2', 'xlml', 'csv', 'txt', 'html']
    }
  },
  computed: {
    bookType: {
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
