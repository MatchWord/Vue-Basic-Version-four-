// 传入的参数 pagination 均为 Number 类型
//  pagination: {
//     pageNum: 1, // 页码
//      pageSize: 10, // 一页显示多少条数据
//      total: 0,
//      pageSizes: [10,20,30]
//   }
// 事件传参 event
//   @sizeChange 回传参数pageNum
//   @changePage 回传参数pageSize
//   使用该模块不需要import 该模块为全局模块，不是局部模块，可在任何模块，任何页面页面中引用。 引用如下
//   <commonPagination :pagination="pagination" @sizeChange="sizeChange" @changePage="changePage" />
//   <common-Pagination :pagination.sync="pagination" @sizeChange="sizeChange" @changePage="changePage" />

import CommonPagination from './commonPagination'

const install = function (Vue) {
  Vue.component(CommonPagination.name, CommonPagination)
}
const VueCommonPagination = { CommonPagination, install }

export default VueCommonPagination
export { CommonPagination, install }