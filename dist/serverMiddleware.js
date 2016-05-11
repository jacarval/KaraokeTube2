'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMiddleware;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = (0, _webpack2.default)(_webpack4.default);

function applyMiddleware(app) {

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    noInfo: true, publicPath: _webpack4.default.output.publicPath, colors: true
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}