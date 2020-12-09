const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = "后台组件"
      }
    })
  }
}

// {
//   options: {
//     template: 'D:\\nodeProgram\\vue-demo\\public\\index.html',
//     templateParameters: (compilation, assets, pluginOptions) => {
//         // enhance html-webpack-plugin's built in template params
//         let stats
//         return Object.assign({
// 			// make stats lazy as it is expensive
// 			get webpack () {
// 				return stats || (stats = compilation.getStats().toJson())
// 			},
// 			compilation: compilation,
// 			webpackConfig: compilation.options,
// 			htmlWebpackPlugin: {
// 				files: assets,
// 				options: pluginOptions
// 			}
//         }, resolveClientEnv(options, true /* raw */))
//     },
//     filename: 'index.html',
//     hash: false,
//     inject: true,
//     compile: true,
//     favicon: false,
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true,
//       collapseBooleanAttributes: true,
//       removeScriptTypeAttributes: true
//     },
//     cache: true,
//     showErrors: true,
//     chunks: 'all',
//     excludeChunks: [],
//     chunksSortMode: 'auto',
//     meta: {},
//     title: 'Webpack App',
//     xhtml: false
//   }
// }