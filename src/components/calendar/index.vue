<template>
  <div class="base-calendar-wrapper">
    <div class="base-calendar-header" :style="{backgroundColor: systemThemeColor}">
        <div class="ctrl prev-button" @click="changeMonthHandle('prev')">上一月</div>
        <div class="today">{{displayDate}}</div>
        <div class="ctrl next-button"  @click="changeMonthHandle('next')">下一月</div>
    </div>
    <div class="base-calendar-title">
      <div v-for="(dayName, index) in weekName" :key="index" class="day">
        {{dayName}}
      </div>
    </div>
    <div class="base-calendar-body">
      <el-scrollbar tag="section" wrap-class="scrollbar-wrapper">
        <div class="base-calendar-week week" v-for="(week, weeKIndex) in calendarDate" :key="weeKIndex" >
          <div class="base-calendar-day"
            v-for="(day, dayIndex) in week" :key="dayIndex"
            @click="onClick(day, calendarDate)"
            :class="{outOfMonth: !day.__isInMonth, isSelected: day.select}">
            <span class="base-calendar-days-in-week"
              :class="{isToday: day.__isToday}"
              :style="{ color: day.__isToday ? systemThemeColor : ''}">{{ day.__mfDay }}</span>
            <slot :day="day" :index="dayIndex"></slot>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
/**
 * Base Calendar
 * ========================================================================
 * Author: Vicco Wang
 * Date: 2018-08-22
 * ========================================================================
 *
 * usage:
 *
 * 基本配置参数:
 *
 * locale  {string}   'zh-cn'
 *
 * options {Object}
 * {
 *    nowDay: '2019-10',  // moment or string 格式的日期
 *    daysExtendsKeys: { },  // 需要合并给day对象中的键值对
 *    customCalData: []   // 需要渲染在每日上的业务数据, 配合上面的键值对使用
 * }
 * ==========================================================================
 *
 */
import moment from 'moment'
import { mapGetters } from 'vuex'
import BaseCalendarService from './service'
export default {
  name: 'BaseCalendarComponent',

  props: {
    locale: {
      type: String,
      default: 'zh-cn'
    },
    options: {
      type: Object
    }
  },

  data () {
    return {
      calendarService: null,
      isCreateNew: true, // 是否新创建日历
      weekName: [],
      calendarDate: [], // 基础日历数据
      disabledDays: [], // 禁止选择日期
      selectedDays: [], // 已选择日期
      nowDay: '', // 当前年-月
      displayDate: '' // 顶部展示的带格式的日期
    }
  },

  computed: {
    ...mapGetters(['theme']),
    systemThemeColor: function () {
      return this.$store.getters.theme
    }
  },

  beforeMount () {
    this.calendarService = new BaseCalendarService({locale: this.locale})
  },

  mounted () {
    this.weekName = this.calendarService.getWeekName().map(m => this.calendarService.formatDate(m, 'ddd'))
    //
    this.createCalendar()
  },

  watch: {
    'options.customCalData': function (newCalDate, oldCalDate) {
      if (newCalDate) {
        this.mergeCustomCalData()
      }
    }
  },

  methods: {
    createCalendar (theDay) {
      // 获取当前日历需要展示的日期,如果传入了时间(YYYY-MM)则按照传入时间展示
      // 否则则按照options设定的日期展示
      let nowDay = theDay ? moment(theDay) : moment.isMoment(this.options.nowDay) ? this.options.nowDay : moment(new Date(this.options.nowDay)) || this.calendarService.getDay()
      this.nowDay = nowDay.format('YYYY-MM')
      // 日历顶部展示的日期
      this.displayDate = nowDay.format('YYYY年MM月')
      // 初始化日历(一并扩展日期)
      this.calendarDate = this.calendarService.createCalDate(nowDay, this.options.daysExtendsKeys || {})
      this.options.calendarDate = this.calendarDate
      this.$emit('initdayEvent', this.calendarDate)
    },
    mergeCustomCalData (day) {
      // 首先初始化日历
      this.createCalendar(day)
      // 叠加自定义业务数据
      this.calendarDate = this.calendarService.mergeCustomDataInCal(this.calendarDate, this.options.dateKey, this.options.customCalData || {})
    },
    onClick (day, calendarDate) {
      this.$emit('onClick', {day, calendarDate})
    },
    // 变更当前日历显示范围(选上/下月等)
    changeCalendar (number, type) {
      const nowDay = this.nowDay
      this.nowDay = null
      const theDay = moment(new Date(nowDay)).add(number, type)
      this.options.nowDay = theDay.toDate()
      this.mergeCustomCalData(theDay)
      this.$emit('monthChanged', theDay.format('YYYY-MM'))
    },
    changeMonthHandle (direction) {
      this.changeCalendar(direction === 'prev' ? -1 : 1, 'M')
    }
  },

  components: {}
}
</script>
<style lang="scss" scoped>
@mixin use-flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
$base-light-color: #f2f2f2;
.base-calendar-wrapper{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .base-calendar-header {
    min-height: 35px;
    color: #fff;
    display: inherit;
    flex-direction: row;
    @include use-flex-center;

    .ctrl {
      width: 150px;
      height:100%;
      cursor: pointer;
      transition: all .3s ease 0s;

      &:hover {
        background-color: rgba(0,0,0,.1)
      }

      &.prev-button{
        @include use-flex-center;
      }

      &.next-button{
        @include use-flex-center;
      }

    }

    .today {
      @include use-flex-center;
      font-size:1.5rem;
      font-weight:600;
      flex: 1 auto;
    }

  }

  .base-calendar-title {
    min-height: 35px;
    background-color: $base-light-color;
    display: inherit;
    flex-direction: row;
    border-bottom: 1px solid darken($base-light-color, 5%);

    .day {
      flex: 1 auto;
      @include use-flex-center;
    }

  }

  .base-calendar-body {
    height: 71vh;
    flex: 1 auto;
    border-left: 1px solid darken($base-light-color, 5%);
    border-bottom: 6px solid darken($base-light-color, 5%);
    .base-calendar-week {
      display: flex;

      &.week {
        &:last-child {
          > div.base-calendar-day {
            border-bottom: none !important;
          }
        }
      }

      .base-calendar-day {
          display: flex;
          flex: 1 auto;
          position: relative;
          min-height:115px;
          box-sizing: border-box;
          border-right: 1px solid darken($base-light-color, 5%);
          border-bottom: 1px solid darken($base-light-color, 5%);
          color: rgba(0,0,0,.7);
          font-weight: 300;
          width: 100%;

          &.outOfMonth {
            color: rgba(0,0,0,.3);
          }

          &.isSelected {
            background-color: rgba(0,0,0,.05);
          }

          .isToday {
            font-weight: 600 !important;
          }

          .base-calendar-days-in-week {
            position: absolute;
            z-index:1;
            font-size:16px;
            right:4px;
            top:4px;
          }

          // &:last-child {
          //   border-right: none;
          // }
        }

    }

  }

}
</style>
