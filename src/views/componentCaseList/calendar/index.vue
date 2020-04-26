<template>
  <div class="wrapper">
    <BaseCalendarComponent
      class="calendar"
      ref="calendar"
      :options.sync="calendarOptions"
      @onClick="onClick"
    >
    </BaseCalendarComponent>
  </div>
</template>

<script>
/**
 * CalendarComp Module
 * ----------------------
 * Author:dsj
 * Date: 2019.06.05
 */

import BaseCalendarComponent from "@/components/calendar";

export default {
  name: "calendar",
  components: { BaseCalendarComponent },
  data() {
    return {
      calendarOptions: {
        dateKey: "departTime",
        nowDay: new Date(),
        customCalData: [],
        daysExtendsKeys: {
          select: false
        }
      }
    };
  },
  props: {},
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    // 日历回调 日期选择
    onClick(calendar) {
      if (calendar.day.select) {
        calendar.day.select = false;
      } else {
        calendar.day.select = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
