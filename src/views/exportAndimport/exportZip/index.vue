<template>
  <div class="page">
    <!-- 搜索 -->
    <common-wrapper>
      <el-input :size="size" v-model="filename" placeholder="请输入文件名称 (默认 file)" style="width:300px;margin-right: 30px;" prefix-icon="el-icon-document" />
      <el-button :size="size" :loading="downloadLoading" type="primary" @click="handleDownload">
        导出Zip
      </el-button>
    </common-wrapper>
    <!-- 列表 -->
    <common-wrapper>
      <common-table :flex="190" :isScroll="false">
        <template slot="table">
          <el-table
          ref="multipleTable"
          stripe
          border
          :size="size"
          :data="tableData"
          height="750"
          @selection-change="handleSelectionChange"
          >
            <el-table-column align='center' type="selection" width="55"></el-table-column>
            <el-table-column align='center' type="index" width="50" label="序号" :index="indexMethod"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip prop="date" label="日期"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip prop="address" label="地址"></el-table-column>
          </el-table>
        </template>
      </common-table>
    </common-wrapper>
  </div>
</template>
<script>
import { tableDataOne } from '@/mock/tableData.js'
export default {
  name: 'exportZip',
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
        pageSizes: [10,20,30]
      },
      downloadLoading: false,
      filename: '',
      multipleSelection: []
    }
  },
  created () {
    this.pagination.total = tableDataOne.length
  },
  mounted () {
    this.tableData = tableDataOne.map((item, index) => {
      return Object.assign({}, item, {index: index})
    })
  },
  watch: {},
  methods: {
    sizeChange (pageSize) {
      console.log(pageSize)
    },
    changePage (pageNum) {
      console.log(pageNum)
    },
    // 生成列表序号（固定写法）
    indexMethod (index) {
      return (index + 1) + (this.pagination.pageNum - 1) * this.pagination.pageSize
    },  
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 导出  
    handleDownload() {
      this.downloadLoading = true
      import('@/components/vendor/Export2Zip').then(zip => {
        const tHeader = ['序号', '日期', '姓名', '地址']
        const filterVal = ['index', 'date', 'name', 'address']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
}
</style>


