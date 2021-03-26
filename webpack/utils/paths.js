const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../../'),
  src: path.resolve(__dirname, '../../src'),
  build: path.resolve(__dirname, '../../dist'),
  public: path.resolve(__dirname, '../../public'),
  entry: path.resolve(__dirname, '../../src/index.js'),
  template: path.resolve(__dirname, '../../public/index.html'),
  favicon: path.resolve(__dirname, '../../public/favicon.ico')
};