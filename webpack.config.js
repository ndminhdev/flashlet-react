const { merge } = require('webpack-merge');
const base = require('./webpack/base');
const dev = require('./webpack/dev');
const prod = require('./webpack/prod');

const { isProd } = require('./webpack/utils/env');

module.exports = isProd
  ? merge(base, prod)
  : merge(base, dev);