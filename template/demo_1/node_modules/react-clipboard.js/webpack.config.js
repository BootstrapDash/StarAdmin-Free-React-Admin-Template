var path = require('path');

module.exports = {
  entry: path.resolve(path.join(__dirname, '.', 'index.js')),
  output: {
    path: path.resolve(path.join(__dirname, '.', 'dist')),
    library: 'ReactClipboard',
    libraryTarget: 'umd',
    filename: 'react-clipboard.js',
    globalObject: 'this',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    }],
  },
  externals: [
    {react: {root: 'React', amd: 'react', commonjs: 'react', commonjs2: 'react'}},
    {'react-dom': {root: 'ReactDOM', amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom'}},
    {'prop-types': {root: 'PropTypes', amd: 'prop-types', commonjs: 'prop-types', commonjs2: 'prop-types'}},
    {clipboard: {root: 'ClipboardJS', amd: 'clipboard', commonjs: 'clipboard', commonjs2: 'clipboard'}},
  ],
};
