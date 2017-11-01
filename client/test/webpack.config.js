const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(__dirname, '../app'),
      path.resolve(__dirname, '../../universal/src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              configFileName: path.resolve(__dirname, '../tsconfig.json')
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  }
};
