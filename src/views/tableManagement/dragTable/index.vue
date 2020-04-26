<template>
  <div class="page">
    <!-- 列表 -->
    <common-wrapper>
      <common-table :flex="190" :isScroll="false">
        <template slot="table">
          <el-table ref="dragTable" id="dragTable"
          stripe border
          highlight-current-row
          :size="size"
          :data="tableData"
          height="750"
          >
            <el-table-column align='center' type="selection" width="55"></el-table-column>
            <el-table-column align='center' type="index" width="50" label="序号"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip prop="date" label="日期"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip prop="name" label="姓名"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip prop="address" label="地址"></el-table-column>
            <el-table-column align='center' show-overflow-tooltip label="操作">
              <div class="iconfont icon-tuodong"></div>
            </el-table-column>
          </el-table>
        </template>
      </common-table>
    </common-wrapper>
    <div class="show-d">
      <el-tag>默认排序:</el-tag> {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>拖拽之后的排序:</el-tag> {{ newList }}
    </div>
  </div>
</template>
<script>
import { tableDataOne } from '@/mock/tableData.js'
import Sortable from 'sortablejs'
export default {
  name: 'DragTable',
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
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created () {},
  mounted () {
    this.tableData = tableDataOne.map((item, index) => {
      return Object.assign({}, item, {index: index})
    })
    this.oldList = this.tableData.map(v => v.index)
    this.newList = this.oldList.slice()
    this.$nextTick(() => {
      this.setSort()
    })
  },
  watch: {},
  methods: { 
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      const _this = this
      // detail see : https://segmentfault.com/a/1190000008209715
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost", 
        setData (dataTransfer, dragEl) {
          dataTransfer.setData('Text', dragEl.textContent)
        },
        // 列表单元拖动开始的回调函数
        onStart (evt) {
          evt.oldIndex
        },
        //  列表单元拖放结束后的回调函数
        onEnd (evt) {
          const targetRow = _this.tableData.splice(evt.oldIndex, 1)[0]
          _this.tableData.splice(evt.newIndex, 0, targetRow)

          const tempIndex = _this.newList.splice(evt.oldIndex, 1)[0]
          _this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>
<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>
<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
  .iconfont {
    font-weight: bold;
    font-size: 24px;
    cursor: move;
  }
}
</style>


