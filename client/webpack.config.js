let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let {getIfUtils, removeEmpty} = require('webpack-config-utils');
let {ifProduction} = getIfUtils(process.env.NODE_ENV);

let extractApplicationCss = new ExtractTextPlugin({
  filename: 'public/app.css',
  allChunks: true
});

let extractVendorCss = new ExtractTextPlugin({
  filename: 'public/vendor.css',
  allChunks: true
});

module.exports = {
  context: __dirname,
  devtool: ifProduction('source-map', 'inline-eval-cheap-source-map'),

  entry: {
    app: './main.ts',
    appStyles: './styles.js',
    vendorStyles: './vendor/styles.js'
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, '..', 'universal', 'src'),
      'node_modules'
    ]
  },

  stats: {
    hash: false,
    version: false,
    children: false
  },

  plugins: removeEmpty([
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin([
      {from: 'public/**/*', to: '../server'}
    ]),
    ifProduction(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {warnings: false}
      })
    ),
    extractApplicationCss,
    extractVendorCss,
    fixAngularSystemImport()
  ]),

  output: {
    path: path.join(__dirname, '..', 'server'),
    filename: 'public/[name].js'
  },

  module: {
    noParse: [/moment.js/],

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
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
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html/,
        exclude: [/index.html/, /node_modules.*/],
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: /\/vendor\/.*\.scss$/,
        loader: extractApplicationCss.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\/vendor\/.*\.scss$/,
        loader: extractVendorCss.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
        })
      },
      {
        test: /(\.min)?\.css$/,
        loader: extractVendorCss.extract({
          fallback: 'style-loader',
          use: 'raw-loader'
        })
      },
      {
        test: /\.(ico|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'public/[name].[ext]'
        }
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      }
    ]
  }
};

/*
 * https://github.com/angular/angular/issues/11580
 */
function fixAngularSystemImport() {
  return new ContextReplacementPlugin(
    /angular\/core\/@angular/,
    path.resolve(__dirname, '../client')
  );
}
