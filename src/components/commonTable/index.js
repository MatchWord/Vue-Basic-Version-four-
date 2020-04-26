/**
 * 
 * <CommonTable></CommonTable>
 * <common-table></common-table>
 */
import CommonTable from './commonTable'

const install = function (Vue) {
  Vue.component(CommonTable.name, CommonTable)
}
const VueCommonTable = { CommonTable, install }

export default VueCommonTable
export { CommonTable, install }
