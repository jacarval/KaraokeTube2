import pgp from 'pg-promise'
import config from 'config';

const connect = pgp()
const db = connect(process.env.DATABASE_URL || config.get('postgres'))

db.tx(function (t) {
	const queries = [
	    this.none("CREATE TABLE IF NOT EXISTS rooms(id text PRIMARY KEY, state json)"),
	    this.none("INSERT INTO rooms(id, state) values('lobby', null)")
	];
	return this.batch(queries);
})
.then(function (data) {
    console.log(data)
})
.catch(function (error) {
    console.log(error)
})

export function getRoom(id) {
	return db.one("SELECT state FROM rooms WHERE id=$1", [id])
			 .then(result => result.state)
			 .catch(err => console.log(' --- get room error --- \n', err))
}

export function updateRoom(id, state) {
	console.log(id, state)
	return db.none("UPDATE rooms SET state=$1 WHERE id=$2", [state, id])
			 .catch(err => console.log(' --- update room error --- \n', err))
}