<template>
  <div class="page">
    <!-- 搜索 -->
    <common-wrapper>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :size="size" :loading="downloadLoading" type="primary" @click="handleDownload">
        导出Excel
      </el-button>
      <el-button :size="size" :loading="downloadLoading" type="primary" @click="handleDownloadSelect">
        导出选中Excel
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
// 自定义组件
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'
export default {
  name: 'exportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
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
      autoWidth: true,
      bookType: 'xlsx',
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
    // 导出
    handleDownload() {
      this.downloadLoading = true
      // see: https://github.com/SheetJS/js-xlsx#supported-output-formats
      import('@/components/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '日期', '姓名', '地址']
        const filterVal = ['index', 'date', 'name', 'address']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    // 导出选中的         
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownloadSelect() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/components/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '日期', '姓名', '地址']
          const filterVal = ['index', 'date', 'name', 'address']
          const list = this.multipleSelection
          const data = this.formatJsonSelect(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: '请选择至少一项',
          type: 'warning'
        })
      }
    },
    formatJsonSelect(filterVal, jsonData) {
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


