const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const entry =isProd ? 'src/main.pro.js' : 'src/main.dev.js';

module.exports = {
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = "页面级组件"

        val.options.isProd = isProd ? true : false;
      }
    })
    if(isProd) {
      // 生产模式
      config.externals = {
        'vue': 'Vue',
        // 'vue-router': 'VueRouter',
        // 'axios': 'axios',
        // 'i18n': 'i18n',
        'element-ui': 'element-ui'
      }
      // window全局查找key来进行使用 不会打包
    } 

  },
   // 用于多页配置，默认是 undefined
   pages: {
    index: {
      // 入口文件
      entry,/*这个是根入口文件*/
      // 模板文件
      template: 'public/index.html',
      // 输出文件
      filename: 'index.html',
      // 页面title
      // title: '页面级组件'
    },
    // subpage: 'src/main.pro.js'
  },
}
