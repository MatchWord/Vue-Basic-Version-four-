/**
 * <!-- 在双花括号中 -->
 * {{ time | timeToDayFilter }}
 * <!-- 在 `v-bind` 中 -->
 * <div v-bind:id="rawId | formatId"></div>
 *
 *  */
import {
  timeToDayFilter,
  timeToSecondFilter,
  timeToHourAndMiniFilter
} from './filter.js'

export default {
  install (Vue) {
    Vue.filter('timeToDayFilter', timeToDayFilter)
    Vue.filter('timeToSecondFilter', timeToSecondFilter)
    Vue.filter('timeToHourAndMiniFilter', timeToHourAndMiniFilter)
  }
}