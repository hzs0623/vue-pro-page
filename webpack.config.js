const { resolve } = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader!css-loader!less-loader"]
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      // 'common': resolve('src/common')
    }
  },
}