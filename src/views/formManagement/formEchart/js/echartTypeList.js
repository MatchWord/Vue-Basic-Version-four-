/**
 * echartTypeList Data()
 */
export const echartTypeList = [
  {name: '折线图', id: 'zhext2020'},
  {name: '柱状图', id: 'zhuzt2020'},
  {name: '饼图', id: 'bingt2020'},
  {name: '散点图', id: 'sandt2020'},
  {name: '地图', id: 'dit2020'},
  {name: 'K线图', id: 'kxt2020'},
  {name: '雷达图', id: 'leidt2020'},
  {name: '热力图', id: 'relt2020'}
]
export const echartAllPigList = [
  {name: '折线图', id: 'zhext2020', children: [
    {pigName: require('./../images/line-simple.jpg'), id: 'zhext2020-1', comName: 'lineSimple'},
    {pigName: require('./../images/line-smooth.jpg'), id: 'zhext2020-2', comName: 'lineSmooth'},
    {pigName: require('./../images/line-marker.jpg'), id: 'zhext2020-3', comName: 'lineMarker'},
    {pigName: require('./../images/line-stack.jpg'), id: 'zhext2020-4', comName: 'lineStack'},
    {pigName: require('./../images/multiple-x-axis.jpg'), id: 'zhext2020-5', comName: 'multipleAxis'},
    {pigName: require('./../images/area-stack.jpg'), id: 'zhext2020-6', comName: 'areaStack'}
  ]},
  {name: '柱状图', id: 'zhuzt2020', children: [
    {pigName: require('./../images/bar-background.jpg'), id: 'zhuzt2020-1', comName: 'barBackground'},
    {pigName: require('./../images/bar-gradient.jpg'), id: 'zhuzt2020-2', comName: 'barGradient'},
    {pigName: require('./../images/bar-stack.jpg'), id: 'zhuzt2020-3', comName: 'barStack'},
    {pigName: require('./../images/mix-line-bar.jpg'), id: 'zhuzt2020-4', comName: 'maxLineBar'},
    {pigName: require('./../images/bar1.jpg'), id: 'zhuzt2020-5', comName: 'bar1'}
  ]},
  {name: '饼图', id: 'bingt2020', children: [
    {pigName: require('./../images/pie-doughnut.jpg'), id: 'bingt2020-1', comName: 'pieDoughnut'}
  ]},
  {name: '散点图', id: 'sandt2020', children: [
    {pigName: require('./../images/bubble-gradient.jpg'), id: 'sandt2020-1', comName: 'bubbleGradient'}
  ]}
]