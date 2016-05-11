'use strict';

var _rethinkdb = require('rethinkdb');

var _rethinkdb2 = _interopRequireDefault(_rethinkdb);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rethinkdb = _config2.default.get('rethinkdb');
var DATABASE = rethinkdb.db;

var TABLES = ['rooms'];
var ROOMS = [{ id: 'lobby', name: 'lobby', playing: {}, queue: [] }];

_rethinkdb2.default.connect(rethinkdb).then(function (conn) {
  console.log(' [-] Database Setup');
  return createDbIfNotExists(conn).then(function () {
    return Promise.all(TABLES.map(function (table) {
      return createTableIfNotExists(conn, table);
    }));
  }).then(function () {
    return Promise.all(ROOMS.map(function (room) {
      return createRoomIfNotExists(conn, room);
    }));
  });
  //.then(() => closeConnection(conn));
});

function createDbIfNotExists(conn) {
  return getDbList(conn).then(function (list) {
    if (list.indexOf(DATABASE) === -1) {
      return createDatabase(conn);
    } else {
      console.log(' [!] Database already exists:', DATABASE);
      return Promise.resolve(true);
    }
  });
}

function createTableIfNotExists(conn, table) {
  return getTableList(conn).then(function (list) {
    if (list.indexOf(table) === -1) {
      createTable(conn, table);
    } else {
      console.log(' [!] Table already exists:', table);
      return Promise.resolve(true);
    }
  });
}

function createRoomIfNotExists(conn, room) {
  return getRoomList(conn).then(function (cursor) {
    cursor.toArray().then(function (list) {
      if (list.map(function (_room) {
        return _room.id;
      }).indexOf(room.id) === -1) {
        createRoom(conn, room);
      } else {
        console.log(' [!] Default room already exists:');
        return Promise.resolve(true);
      }
    });
  });
}

function getDbList(conn) {
  return _rethinkdb2.default.dbList().run(conn);
}

function getTableList(conn) {
  return _rethinkdb2.default.db(DATABASE).tableList().run(conn);
}

function getRoomList(conn) {
  return _rethinkdb2.default.db(DATABASE).table('rooms').run(conn);
}

function createDatabase(conn) {
  console.log(' [-] Create Database:', DATABASE);
  return _rethinkdb2.default.dbCreate(DATABASE).run(conn);
}

function createTable(conn, table) {
  console.log(' [-] Create Table:', table);
  return _rethinkdb2.default.db(DATABASE).tableCreate(table).run(conn);
}

function createRoom(conn, room) {
  console.log(' [-] Create Room:', room.name);
  return _rethinkdb2.default.db(DATABASE).table('rooms').insert(room).run(conn);
}

function closeConnection(conn) {
  console.log(' [x] Close connection!');
  return conn.close();
}