/**
 * EXTEND PATTERN
 */
const stringNumber = /^[0-9]*$/
const account = /^[a-zA-Z0-9_-]{4,}$/
const cellPhone = /^1[34578]\d{9}$/
const complexPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
const qq = /^[a-zA-Z0-9_-]{4,16}$/
const dictTypeCode = /^[0-9a-zA-Z_]{1,10}$/
const dictOther = /^[\s\S]{1,1000}$/
const dictNum = /^[0-9]{1,3}$/
const paramsOther = /^[\s\S]{1,50}$/
const vehicleNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{3,5}[A-Z0-9挂学警港澳]{1}$/
const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
export default {
  stringNumber,
  account,
  cellPhone,
  complexPassword,
  qq,
  dictTypeCode,
  dictOther,
  dictNum,
  paramsOther,
  vehicleNumber,
  urlregex
}
