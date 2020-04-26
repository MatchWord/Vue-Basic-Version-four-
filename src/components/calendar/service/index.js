/**
 * Base Calendar Service
 * ========================================================================
 * Author: Vicco Wang
 * Date: 2018-08-22
 * ========================================================================
 * 构建基本日历对象的服务
 * ==========================================================================
 */
import moment from 'moment'
import 'moment/locale/zh-cn'

export default class BaseCalendarService {
  constructor ({locale}) {
    this.eventStartDate = null
    this.eventEndDate = null
    this.calStartDate = null
    this.calEndDate = null
    this.locale = locale
  }

  createCalDate (ctrlDate, daysExtendsKeys) {
    const mDateArray = _getWeekDays(ctrlDate)
    const weekDaysData = []
    let i
    let j

    for (i = 0; i < mDateArray.length; i++) {
      const week = mDateArray[i]
      const weekLen = week.length
      const tmpArr = []

      for (j = 0; j < weekLen; j++) {
        const mDate = week[j]
        const mfDate = mDate.format('YYYY-MM-DD')
        // 人性化处理, 每逢1日显示月份
        const temMfDay = mDate.format('DD')
        const mfDay = temMfDay === '01' ? mDate.format('M月D日') : temMfDay

        let daysObject = {
          __isToday: _isTheSameDay(mfDate, this.getDay().format('YYYY-MM-DD')),
          __isInMonth: _isInMonth(mDate, ctrlDate),
          __isBeforeToday: __isBeforeToday(mDate),
          __mDate: mDate,
          __mDateTime: new Date(mDate).getTime(),
          __mfDate: mfDate,
          __mfDay: mfDay
        }
        daysObject = Object.assign(daysObject, daysExtendsKeys || {})
        if (i === 0 && j === 0) this.calStartDate = mDate
        if (i === mDateArray.length - 1 && j === weekLen - 1) this.calEndDate = mDate
        tmpArr.push(daysObject)
      }
      weekDaysData.push(tmpArr)
    }
    return weekDaysData
  }

  /**
   * 合并用户自定义数据至每天数据对象中
   * @param {*} calDate         // 日历原始数据对象
   * @param {*} dateKey         // date 字段自定义Key
   * @param {*} customCalData   // 自定义业务数据对象
   * @param {*} daysExtendsKeys // 自定义扩展day key-value
   */
  mergeCustomDataInCal (calDate, dateKey = 'date', customCalData) {
    return calDate.map(week => {
      return week.map(weekDay => {
        const thisCustomDayData = customCalData.filter(day => moment(day.date).isSame(weekDay.__mDate))[0]

        return Object.assign({}, weekDay, thisCustomDayData)
      })
    })
  }

  getCalDateRange () {
    return [this.calStartDate, this.calEndDate]
  }

  getDay (day) {
    return day ? moment(day) : moment()
  }

  getWeekName () {
    const weekNames = []

    const isLocale = _isInLocale(this.locale) ? 1 : 0

    for (let i = 0; i < 7; i++) {
      // 非中文不需要+1
      weekNames.push(moment().day(i + isLocale))
    }
    return weekNames
  }

  getCtrlDay (date) {
    if (moment.isMoment(date)) return date
    if (moment.isDate(date)) return moment(date)
    if (typeof (date) === 'string' && moment.isMoment(moment(date))) return moment(date)
    return false
  }

  formatDate (date, reg) {
    if (!moment.isMoment(date)) {
      return moment(date).format(reg)
    }
    return date.format(reg)
  }
}

/// ///////////////////////////////////////////
// Private Functions
/// ///////////////////////////////////////////

function _isInLocale (locale) {
  return locale === 'zh-cn'
}

function _createMomentDate (year, month, day, hour, min) {
  var utc = Date.UTC(year | 0, month | 0, day | 0, hour | 0, min | 0)
  return moment(utc)
}

function _isTheSameDay (date1, date2) {
  return new Date(date1).getTime() === new Date(date2).getTime()
}

function _isInMonth (mDate, checkMonthDate) {
  return mDate.month() === checkMonthDate.month()
}

function __isBeforeToday (mDate) {
  return mDate.isBefore(moment().subtract(1, 'd'))
}

function _getDaysInWeek (m) {
  const days = []
  const year = m.year()
  const month = m.month()
  const offset = m.utcOffset() / 60
  let day = m.date()
  let actualOffset

  for (let i = 0; i < 7; i++) {
    let pushedDate = _createMomentDate(year, month, day, 0 - offset, 0, false)
    actualOffset = pushedDate.utcOffset() / 60
    if (actualOffset !== offset) {
      pushedDate = _createMomentDate(year, month, day, 0 - actualOffset, 0, false)
    }
    days.push(pushedDate)
    day++
  }
  return days
}

// function isWeekend (mDate) {
//   return mDate.day() === 6 || mDate.day() === 0
// }

function _getWeekDays (m) {
  m = moment(m) || moment()
  const firstDay = moment().weekday(0).day()
  // const startYear = m.year()
  // const startMonth = m.month()
  let weeks = []
  // 先设置为1号
  m.date(1)
  // 取当月1号为星期几
  let day = m.day()

  m.date(firstDay - (day + (firstDay >= day ? 6 : -1)))
  // 如果第一周（第一行）7天都为上个月补全，则第一行应直接跨过这些天
  if (moment(m).add(7, 'days').date() === 1) m.add(7, 'days')
  // 循环出所有42格日期
  while (weeks.length < 6) {
    weeks.push(_getDaysInWeek(m))
    m.add(7, 'd')
  }
  return weeks
  
}
