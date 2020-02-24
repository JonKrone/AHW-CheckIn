const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = config => {
  config.optimization.runtimeChunk = false
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  }

  config.plugins = config.plugins.map(plugin => {
    return plugin instanceof MiniCssExtractPlugin
      ? new MiniCssExtractPlugin({
          filename: 'static/css/[name].css',
          chunkFilename: 'static/css/[name].chunk.css',
        })
      : plugin
  })

  return config
}
