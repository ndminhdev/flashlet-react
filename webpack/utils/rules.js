// Javascript rules
exports.jsRules = {
  test: /\.(js|jsx)$/,
  use: ['babel-loader']
};

// HTML rules
exports.htmlRules = {
  test: /\.(html)$/,
  use: ['html-loader']
};

// CSS rules
exports.cssRules = {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    'postcss-loader'
  ]
};

// SASS rules
exports.sassRules = {
  test: /\.s[ac]ss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ]
};

// Image rules
exports.imageRules = {
  test: /\.(?:ico|png|gif|jpg|jpeg)/i,
  type: 'asset/resource'
};

// Font rules
exports.fontRules = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource'
};

// SVG rules
exports.svgRules = [
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: /\.(js|jsx)$/,
    use: [
      'babel-loader',
      {
        loader: '@svgr/webpack',
        options: {
          babel: false
        }
      }
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: { not: [/\.(js|jsx)$/] },
    type: 'asset/inline'
  }
]