import r from 'rethinkdb';
import config from 'config';

const rethinkdb = config.get('rethinkdb');
const DATABASE = rethinkdb.db;

let TABLES = ['rooms'];
let ROOMS = [
  { id:'lobby', name:'lobby', playing: {}, queue: [] }
];

r.connect(rethinkdb)
 .then(conn => {
  console.log(' [-] Database Setup');
  return createDbIfNotExists(conn)
  .then(() => Promise.all(TABLES.map((table) => createTableIfNotExists(conn, table))))
  .then(() => Promise.all(ROOMS.map((room) => createRoomIfNotExists(conn, room))))
  //.then(() => closeConnection(conn));
});

function createDbIfNotExists(conn){
  return getDbList(conn)
  .then((list) => {
    if(list.indexOf(DATABASE) === -1) {
      return createDatabase(conn);
    } else {
      console.log(' [!] Database already exists:', DATABASE);
      return Promise.resolve(true);
    }
  });
}

function createTableIfNotExists(conn, table) {
  return getTableList(conn)
  .then((list) => {
    if(list.indexOf(table) === -1) {
      createTable(conn, table);
    } else {
      console.log(' [!] Table already exists:', table);
      return Promise.resolve(true);
    }
  });
}

function createRoomIfNotExists(conn, room) {
  return getRoomList(conn)
  .then((cursor) => {
    cursor.toArray().then(list => {
      if(list.map(_room => { return _room.id }).indexOf(room.id) === -1 ) {
        createRoom(conn, room) 
      }
      else {
        console.log(' [!] Default room already exists:');
        return Promise.resolve(true);
      }
    })
  })
}

function getDbList(conn) {
  return r.dbList().run(conn);
}

function getTableList(conn) {
  return r.db(DATABASE).tableList().run(conn);
}

function getRoomList(conn) {
  return r.db(DATABASE).table('rooms').run(conn)
}

function createDatabase(conn) {
  console.log(' [-] Create Database:', DATABASE);
  return r.dbCreate(DATABASE).run(conn);
}

function createTable(conn, table) {
  console.log(' [-] Create Table:', table);
  return r.db(DATABASE).tableCreate(table).run(conn);
}

function createRoom(conn, room) {
  console.log(' [-] Create Room:', room.name);
  return r.db(DATABASE).table('rooms').insert(room).run(conn)
}

function closeConnection(conn) {
  console.log(' [x] Close connection!');
  return conn.close();
}