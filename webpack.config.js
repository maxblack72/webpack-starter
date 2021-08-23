const path = require('path');
const fs = require('fs');
const mode = process.env.NODE_ENV || "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode defaults to 'production' if not set
  mode: mode,

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
              },
              filters: {
                asset_image(value) {
                  let dist = './dist/assets/images';

                  if (!fs.existsSync(dist)){
                    fs.mkdirSync(dist, { recursive: true });
                  }
                  
                  // File "destination.txt" will be created or overwritten by default.
                  fs.copyFile('./src/public/assets/images/'+value, dist+"/"+value, (err) => {
                    if (err) 
                        throw err;
                  });
                  return 'assets/images/' + value;
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: "asset",
        use: [
          {
            loader: 'file-loader'
          },
        ],
        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
        },
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack 5 Starter',
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
    })
  ],

  entry: './src/public/js/index.js',

  devtool: "source-map",

  // required if using webpack-dev-server
  devServer: {
    contentBase: "./dist",
  },
};