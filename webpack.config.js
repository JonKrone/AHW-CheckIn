const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const glob = require('glob')

module.exports = {
  mode: 'production',
  entry: {
    'bundle.js': glob
      .sync('build/static/?(js|css)/*.?(js|css)$')
      .map(f => path.resolve(__dirname, f)),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/bundle.min.css',
    }),
  ],

  // this optimization causes MiniCssExtractPlugin to concat all CSS modules
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}
