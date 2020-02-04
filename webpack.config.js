const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: [/.css$/],
      use:[
        'style-loader',
        'css-loader',
        'sass-loader'
      ] 
    }]
  },
  entry: './src/public/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack 4 Starter',
        template: './src/index.html',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    })
  ]
};