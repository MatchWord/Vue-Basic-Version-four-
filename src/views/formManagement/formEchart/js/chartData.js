/**
 * chartData Data()
 */
export const lineSimple = {
  xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
  }]
}
export const lineSmooth = {
  xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
  }]
}

export const lineMarker = {
  title: {
      text: '未来一周气温变化',
      subtext: '纯属虚构'
  },
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['最高气温', '最低气温']
  },
  toolbox: {
      show: true,
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
      type: 'value',
      axisLabel: {
          formatter: '{value} °C'
      }
  },
  series: [
      {
          name: '最高气温',
          type: 'line',
          data: [11, 11, 15, 13, 12, 13, 10],
          markPoint: {
              data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
              ]
          },
          markLine: {
              data: [
                  {type: 'average', name: '平均值'}
              ]
          }
      },
      {
          name: '最低气温',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
              data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              ]
          },
          markLine: {
              data: [
                  {type: 'average', name: '平均值'},
                  [{
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                  }, {
                      symbol: 'circle',
                      label: {
                          position: 'start',
                          formatter: '最大值'
                      },
                      type: 'max',
                      name: '最高点'
                  }]
              ]
          }
      }
  ]
}
export const lineStack = {
  title: {
      text: '折线图堆叠'
  },
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
  ]
}
var colors = ['#5793f3', '#d14a61', '#675bba']
export const multipleAxis = {
  color: colors,

  tooltip: {
      trigger: 'none',
      axisPointer: {
          type: 'cross'
      }
  },
  legend: {
      data:['2015 降水量', '2016 降水量']
  },
  grid: {
      top: 70,
      bottom: 50
  },
  xAxis: [
      {
          type: 'category',
          axisTick: {
              alignWithLabel: true
          },
          axisLine: {
              onZero: false,
              lineStyle: {
                  color: colors[1]
              }
          },
          axisPointer: {
              label: {
                  formatter: function (params) {
                      return '降水量  ' + params.value
                          + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
              }
          },
          data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
      },
      {
          type: 'category',
          axisTick: {
              alignWithLabel: true
          },
          axisLine: {
              onZero: false,
              lineStyle: {
                  color: colors[0]
              }
          },
          axisPointer: {
              label: {
                  formatter: function (params) {
                      return '降水量  ' + params.value
                          + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
              }
          },
          data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
      }
  ],
  yAxis: [
      {
          type: 'value'
      }
  ],
  series: [
      {
          name: '2015 降水量',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      },
      {
          name: '2016 降水量',
          type: 'line',
          smooth: true,
          data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
      }
  ]
}

export const areaStack = {
  title: {
      text: '堆叠区域图'
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
  },
  legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: [
      {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
  ],
  yAxis: [
      {
          type: 'value'
      }
  ],
  series: [
      {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'top'
              }
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
  ]
}
