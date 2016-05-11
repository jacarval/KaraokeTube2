'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoom = getRoom;
exports.updateRoom = updateRoom;

var _rethinkdb = require('rethinkdb');

var _rethinkdb2 = _interopRequireDefault(_rethinkdb);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect() {
  return _rethinkdb2.default.connect(_config2.default.get('rethinkdb'));
}

function getRoom(id) {
  return connect().then(function (connection) {
    return _rethinkdb2.default.table('rooms').get(id).run(connection).then(function (result) {
      return result;
    });
  });
}

function updateRoom(id, room) {
  return connect().then(function (conn) {
    return _rethinkdb2.default.table('rooms').get(id).update(room).run(conn).then(function () {
      return room;
    });
  });
}