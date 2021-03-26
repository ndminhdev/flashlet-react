/**
 * Webpack common configurations for both development and production mode
 */
const entry = require('./utils/entry');
const { alias } = require('./utils/config');
const optimization = require('./utils/optimization');
const plugins = require('./utils/plugins');
const rules = require('./utils/rules');
const { isDev } = require('./utils/env');
const paths = require('./utils/paths');

module.exports = {
  context: __dirname,
  target: isDev ? 'web' : ['web', 'es5'],
  entry,
  output: {
    path: paths.build,
    publicPath: './',
    filename: isDev ? '[name].[fullhash].js' : '[name].[contenthash].js'
  },
  module: {
    rules: [
      rules.jsRules,
      rules.htmlRules,
      rules.cssRules,
      rules.sassRules,
      rules.imageRules,
      rules.fontRules,
      ...rules.svgRules
    ]
  },
  plugins: [
    plugins.htmlPlugin,
    plugins.definePlugin,
    plugins.esLintPlugin,
    // Turn on next line if you want to use CopyWebpackPlugin
    // plugins.copyPlugin
  ],
  resolve: {
    alias,
    extensions: ['.js', '.jsx']
  },
  optimization
};