var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  name: 'main',

  devtool: 'source-map',

  entry: {
    client: [
      path.resolve(__dirname, 'client', 'index.js')
    ],
    vendor: [
      'font-awesome/css/font-awesome.css',
      'foundation-sites/dist/foundation-flex.css',
      '!!script!jquery/dist/jquery.min.js',
      '!!script!foundation-sites/dist/foundation.min.js',
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  resolve: {
    modulesDirectories: ['node_modules', './client'],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.ProvidePlugin({'$': 'jquery', jQuery: 'jquery'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, minimize: true})
  ],

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/, include: path.resolve(__dirname, 'client') },
      { test: /\.scss$/, loader: "style!css!autoprefixer-loader?browsers=last 2 versions!sass" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.(webm|mp4|mov|m4v|ogg)$/, loader: 'file-loader?name=videos/[name].[ext]' },
      { test: /\.(eot|svg|ttf|woff|woff2)/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  }
};