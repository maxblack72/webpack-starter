const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html.twig$/,
        use: [
          'raw-loader',
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                'layouts': './src/views/layouts',
                'components': './src/views/components',
              }
            }
          }
        ]
      },
      {
      test: [/.css$|.scss$/],
      use:[
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ] 
    },{
      test: /\.(png|jpg|gif|svg)$/,
      use:[{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images'
          }
        }] 
    }],
  },
  entry: './src/public/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack 4 Starter',
        filename: 'index.html',
        template: './src/views/index.html.twig',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new HtmlWebpackPlugin({
        title: 'About Page',
        filename: 'about.html',
        template: './src/views/about.html.twig',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin([{
      from:'./src/public/assets/images',
      to:'assets/images'
    }])
  ]
};