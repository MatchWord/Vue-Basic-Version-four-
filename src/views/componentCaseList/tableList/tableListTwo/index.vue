<template>
  <div class="page">
    <common-wrapper>
      <common-table :flex="150">
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
        <template slot="pagination">
          <common-Pagination :pagination.sync="pagination" @sizeChange="sizeChange" @changePage="changePage" />
        </template>
      </common-table>
    </common-wrapper>
  </div>
</template>
<script>
import { tableDataOne } from '@/mock/tableData.js'
export default {
  name: 'tableListTwo',
  components: {},
  props: {},
  computed: {
    size () {
      return this.$store.getters.size
    }
  },
  data () {
    return {
      tableData: [],
      pagination: {
        pageNum: 1, // 页码
        pageSize: 10, // 一页显示多少条数据
        total: 300,
        pageSizes: [10, 20, 30]
      }
    }
  },
  created () {},
  mounted () {
    this.tableData = tableDataOne
  },
  watch: {},
  methods: {
    sizeChange (pageSize) {
      console.log(pageSize)
    },
    changePage (pageNum) {
      console.log(pageNum)
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>
