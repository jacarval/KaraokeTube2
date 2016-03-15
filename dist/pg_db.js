'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRoom = getRoom;
exports.updateRoom = updateRoom;

var _pgPromise = require('pg-promise');

var _pgPromise2 = _interopRequireDefault(_pgPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = (0, _pgPromise2.default)();
var db = connect(process.env.DATABASE_URL || _config2.default.get('postgres'));

db.tx(function (t) {
	var queries = [this.none("CREATE TABLE IF NOT EXISTS rooms(id text PRIMARY KEY, state json)"), this.none("INSERT INTO rooms(id, state) values('lobby', null)")];
	return this.batch(queries);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.log(error);
});

function getRoom(id) {
	return db.one("SELECT state FROM rooms WHERE id=$1", [id]).then(function (result) {
		return result.state;
	}).catch(function (err) {
		return console.log(' --- get room error --- \n', err);
	});
}

function updateRoom(id, state) {
	console.log(id, state);
	return db.none("UPDATE rooms SET state=$1 WHERE id=$2", [state, id]).catch(function (err) {
		return console.log(' --- update room error --- \n', err);
	});
}