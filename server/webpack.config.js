const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  target: 'node',
  devtool: 'inline-source-map',
  externals: [nodeExternals()],

  output: {
    path: path.join(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      universal: path.resolve(__dirname, '../universal/src')
    }
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
              configFileName: path.resolve(__dirname, 'tsconfig.json')
            }
          }
        ]
      }
    ]
  }
};
