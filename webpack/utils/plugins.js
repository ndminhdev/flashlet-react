const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const paths = require('./paths');
const { mode, isDev, isProd } = require('./env');

// clean plugin
exports.cleanPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: [
    '**/*',
    '!profile.json'
  ]
});

// html plugin
exports.htmlPlugin = new HtmlWebpackPlugin({
  template: paths.template,
  filename: 'index.html',
  inject: true,
  favicon: paths.favicon
});

// copy plugin
exports.copyPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: paths.src + '/assets/public', to: 'public' }
  ]
});

// mini css extract plugin
exports.miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].[contenthash].css'
});

// define plugin
exports.definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(mode)
  },
  IS_PROD: isProd,
  IS_DEV: isDev
});

// eslint plugin
exports.esLintPlugin = new ESLintPlugin({
  context: paths.src,
  extensions: ['js', 'jsx']
});