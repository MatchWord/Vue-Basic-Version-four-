// vue.config.js
module.exports = {
  // 引入全局scss样式
  // chainWebpack: config => {
  //   const oneOfsMap = config.module.rule('scss').oneOfs.store
  //   oneOfsMap.forEach(item => {
  //       item.use('sass-resources-loader')
  //           .loader('sass-resources-loader')
  //           .options({
  //               // Provide path to the file with resources
  //               // 要公用的scss的路径
  //               resources: './src/common/style/common.scss'
  //           })
  //           .end()
  //   })
  //   config.module
  //       .rule('vue')
  //       .use('vue-loader')
  //       .loader('vue-loader')
  //       .tap(options => {
  //           // 修改它的选项...
  //           return options
  //       })
  // },
  // 引入高德地图
  devServer: {
    port: 57103 // 端口号配置
   },
   configureWebpack: {
    externals: {
      'AMap': 'AMap',
      'AMapUI': 'AMapUI'
    }
  },
  // 处理打包时console.log 报错
  lintOnSave: false,
  // 处理打包之后静态资源找不到
  publicPath: './'
}