module.exports = {
  rules: [{
    test: /\.less$/,
    loader: "style-loader!css-loader!less-loader",
  }]
}