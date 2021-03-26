/**
 * Webpack prod configurations only for production mode
 */
const TerserWebpackPlugin = require('terser-webpack-plugin');

const plugins = require('./utils/plugins');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()]
  },
  plugins: [
    plugins.cleanPlugin,
    plugins.miniCssExtractPlugin
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};