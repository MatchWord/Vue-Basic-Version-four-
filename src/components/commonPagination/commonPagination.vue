<template>
  <el-pagination  background layout="total, sizes, prev, pager, next, jumper"
    @size-change="sizeChange"
    @current-change="changePage"
    :current-page.sync="pagination.pageNum"
    :page-sizes="pagination.pageSizes"
    :page-size="pagination.pageSize"
    :total="pagination.total">
  </el-pagination>
</template>
<script>

export default{
  name: 'commonPagination',
  props: {
    pagination: {
      type: Object
    }
  },
  methods: {
    sizeChange (pageNum) {
      this.$emit('sizeChange', pageNum)
    },
    changePage (pageSize) {
      this.$emit('changePage', pageSize)
    }
  },
  watch: {},
  mounted () {}
}
</script>
