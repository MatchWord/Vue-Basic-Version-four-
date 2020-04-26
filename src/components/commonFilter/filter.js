/**
 * <!-- 在双花括号中 -->
 * {{ time | timeToDayFilter }}
 * <!-- 在 `v-bind` 中 -->
 * <div v-bind:id="rawId | formatId"></div>
 *
 *
 *
 * 定义完自己的过滤器请到index.js中注入全局过滤器
 *  */
import moment from 'moment'

export function timeToDayFilter (time) {
  if (!time) return ''
  return moment(time).format('YYYY-MM-DD')
}

export function timeToSecondFilter (time) {
  if (!time) return ''
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export function timeToHourAndMiniFilter (time) {
  if (!time) return ''
  return moment(time).format('HH:mm')
}