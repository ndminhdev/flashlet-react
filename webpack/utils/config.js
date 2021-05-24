const paths = require('./paths');

// alias
exports.alias = {
  '@': paths.src
};

// devServer
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

exports.devServer = {
  host,
  port,
  publicPath: '/',
  historyApiFallback: true,
  compress: true,
  hot: true,
  overlay: true
};

// postcss
const { isProd } = require('./env');

exports.postcss = () => {
  const plugins = [
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
    }),
    'autoprefixer',
    isProd ? 'cssnano' : null
  ].filter(Boolean);

  return { plugins };
};

// sassResources
exports.sassResourceItems = [];