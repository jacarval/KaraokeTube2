var path = require('path');
var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var autoprefixer = require('autoprefixer');

module.exports = {
  name: 'main',

  devtool: 'eval',

  entry: {
    client: [
      path.resolve(__dirname, 'client', 'index.js'),
      hotMiddlewareScript
    ],
    vendor: [
      'font-awesome/css/font-awesome.css',
      'foundation-sites/dist/foundation-flex.css',
      '!!script!jquery/dist/jquery.min.js',
      '!!script!foundation-sites/dist/foundation.min.js',
      'immutable',
      'isomorphic-fetch',
      '!!react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-youtube',
      'socket.io-client'
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.ProvidePlugin({'$': 'jquery', jQuery: 'jquery'})
  ],

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/, include: path.resolve(__dirname, 'client') },
      { test: /\.scss$/, loader: "style!css!autoprefixer-loader?browsers=last 2 versions!sass" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.(webm|mp4|mov|m4v|ogg)$/, loader: 'file-loader?name=videos/[name].[ext]' },
      { test: /\.(eot|svg|ttf|woff|woff2)/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  }
};