import r from 'rethinkdb';
import config from 'config';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function getRoom(id) {
  return connect()
  .then(connection => {
    return r
    .table('rooms')
    .get(id).run(connection)
    .then(result => result);
  });
}

export function updateRoom(id, room) {
  return connect()
  .then(conn => {
    return r
    .table('rooms')
    .get(id).update(room).run(conn)
    .then(() => room);
  });
}

