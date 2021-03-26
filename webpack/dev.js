/**
 * Webpack dev configurations only for development mode
 */
const { devServer } = require('./utils/config');

module.exports = {
  devtool: 'inline-source-map',
  plugins: [],
  devServer
};