const path = require('path');

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'deploy'),
    // Make sure the bundle is generated as a library
    libraryTarget: 'commonjs',
  },
  target: 'node',
};
