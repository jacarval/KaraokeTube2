'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _redux = require('redux');

var _immutable = require('immutable');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

// var _serverMiddleware = require('./serverMiddleware');

// var _serverMiddleware2 = _interopRequireDefault(_serverMiddleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicPath = _path2.default.resolve(__dirname, '..', 'dist');
var app = (0, _express2.default)();
var server = (0, _http.createServer)(app);
var io = (0, _socket2.default)();

// (0, _serverMiddleware2.default)(app);

app.use('/dist', _express2.default.static(publicPath));

app.get('/', function (req, res) {
	res.sendFile(publicPath + '/index.html');
});

db.getRoom('lobby').then(function (state) {

	var store = (0, _redux.createStore)(_reducer2.default, (0, _immutable.fromJS)(state));

	io.on('connection', function (socket) {
		socket.emit('state', store.getState().toJS());
		socket.on('action', store.dispatch.bind(store));
	});

	io.attach(server);

	store.subscribe(function (e) {
		io.emit('state', store.getState().toJS());
		db.updateRoom('lobby', store.getState().toJS());
	});
});

server.listen(process.env.PORT || 3000, '0.0.0.0', function () {
	return console.log('listening on ' + (process.env.PORT || 3000));
});