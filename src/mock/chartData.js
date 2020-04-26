/**
 * Charts Demo Data
 *
*/
export const barChar1Data = {
  tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  legend: {
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
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
          name: '直接访问',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
          name: '邮件营销',
          type: 'bar',
          stack: '广告',
          data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
          name: '联盟广告',
          type: 'bar',
          stack: '广告',
          data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
          name: '视频广告',
          type: 'bar',
          stack: '广告',
          data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
          name: '搜索引擎',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
              lineStyle: {
                  type: 'dashed'
              },
              data: [
                  [{type: 'min'}, {type: 'max'}]
              ]
          }
      },
      {
          name: '百度',
          type: 'bar',
          barWidth: 5,
          stack: '搜索引擎',
          data: [620, 732, 701, 734, 1090, 1130, 1120]
      },
      {
          name: '谷歌',
          type: 'bar',
          stack: '搜索引擎',
          data: [120, 132, 101, 134, 290, 230, 220]
      },
      {
          name: '必应',
          type: 'bar',
          stack: '搜索引擎',
          data: [60, 72, 71, 74, 190, 130, 110]
      },
      {
          name: '其他',
          type: 'bar',
          stack: '搜索引擎',
          data: [62, 82, 91, 84, 109, 110, 120]
      }
  ]
}

export const barChar2Data = {
  title: {
    text: '某地区蒸发量和降水量',
    subtext: '纯属虚构'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['蒸发量', '降水量']
  },
  // toolbox: {
  //   show: true,
  //   feature: {
  //     dataView: {
  //       show: true,
  //       readOnly: false
  //     },
  //     magicType: {
  //       show: true,
  //       type: ['line', 'bar']
  //     },
  //     restore: {
  //       show: true
  //     },
  //     saveAsImage: {
  //       show: true
  //     }
  //   }
  // },
  calculable: true,
  xAxis: [{
    type: 'category',
    data: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ]
  }],
  yAxis: [{
    type: 'value'
  }],
  series: [{
    name: '蒸发量',
    type: 'line',
    data: [
      2.0,
      4.9,
      7.0,
      23.2,
      25.6,
      76.7,
      135.6,
      162.2,
      32.6,
      20.0,
      6.4,
      3.3
    ],
    markPoint: {
      data: [{
        type: 'max',
        name: '最大值'
      },
      {
        type: 'min',
        name: '最小值'
      }
      ]
    },
    markLine: {
      data: [{
        type: 'average',
        name: '平均值'
      }]
    }
  },
  {
    name: '降水量',
    type: 'line',
    data: [
      2.6,
      5.9,
      9.0,
      26.4,
      28.7,
      70.7,
      175.6,
      182.2,
      48.7,
      18.8,
      6.0,
      2.3
    ],
    markPoint: {
      data: [{
        name: '年最高',
        value: 182.2,
        xAxis: 7,
        yAxis: 183
      },
      {
        name: '年最低',
        value: 2.3,
        xAxis: 11,
        yAxis: 3
      }
      ]
    },
    markLine: {
      data: [{
        type: 'average',
        name: '平均值'
      }]
    }
  }
  ]
}

export const barChar3Data = {
  title: {
    text: '某站点用户访问来源',
    subtext: '纯属虚构',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
export const barChar4Data ={
  title: {
      text: '多雷达图'
  },
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      left: 'center',
      data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
  },
  radar: [
      {
          indicator: [
              {text: '品牌', max: 100},
              {text: '内容', max: 100},
              {text: '可用性', max: 100},
              {text: '功能', max: 100}
          ],
          center: ['25%', '40%'],
          radius: 80
      },
      {
          indicator: [
              {text: '外观', max: 100},
              {text: '拍照', max: 100},
              {text: '系统', max: 100},
              {text: '性能', max: 100},
              {text: '屏幕', max: 100}
          ],
          radius: 80,
          center: ['50%', '60%'],
      },
      {
          indicator: (function (){
              var res = [];
              for (var i = 1; i <= 12; i++) {
                  res.push({text: i + '月', max: 100});
              }
              return res;
          })(),
          center: ['75%', '40%'],
          radius: 80
      }
  ],
  series: [
      {
          type: 'radar',
          tooltip: {
              trigger: 'item'
          },
          areaStyle: {},
          data: [
              {
                  value: [60, 73, 85, 40],
                  name: '某软件'
              }
          ]
      },
      {
          type: 'radar',
          radarIndex: 1,
          areaStyle: {},
          data: [
              {
                  value: [85, 90, 90, 95, 95],
                  name: '某主食手机'
              },
              {
                  value: [95, 80, 95, 90, 93],
                  name: '某水果手机'
              }
          ]
      },
      {
          type: 'radar',
          radarIndex: 2,
          areaStyle: {},
          data: [
              {
                  name: '降水量',
                  value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
              },
              {
                  name: '蒸发量',
                  value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
              }
          ]
      }
  ]
}
