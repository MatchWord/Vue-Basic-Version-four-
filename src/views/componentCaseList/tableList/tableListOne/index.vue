<template>
  <div class="page">
    <common-table>
      <template slot="table">
        <el-table
        stripe
        :size="size"
        :data="tableData"
        >
          <el-table-column align='center' show-overflow-tooltip prop="date" label="日期"></el-table-column>
          <el-table-column align='center' show-overflow-tooltip prop="name" label="姓名"></el-table-column>
          <el-table-column align='center' show-overflow-tooltip prop="address" label="地址"></el-table-column>
        </el-table>
      </template>
    </common-table>
  </div>
</template>
<script>
import { tableDataOne } from '@/mock/tableData.js'
export default {
  name: 'tableListOne',
  components: {},
  props: {},
  computed: {
    size () {
      return this.$store.getters.size
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {},
  mounted () {
    this.tableData = tableDataOne
  },
  watch: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
}
</style>


