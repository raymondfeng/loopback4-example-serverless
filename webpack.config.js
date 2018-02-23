const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'webpack'),
    // Make sure the bundle is generated as a library
    libraryTarget: 'commonjs',
  },
  target: 'node',
};
