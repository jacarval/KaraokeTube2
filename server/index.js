import path from 'path'
import express from 'express'
import { createServer } from 'http'
import socket_io from 'socket.io'
import { createStore } from 'redux'
import { fromJS } from 'immutable'
import reducer from './reducer'
import * as db from './db'

import applyDevMiddleware from './serverMiddleware'

const publicPath = path.resolve(__dirname, '..' , 'dist')
const app = express()
const server = createServer(app)
const io = socket_io()

applyDevMiddleware(app)

app.use('/dist', express.static(publicPath))

app.get('/', function (req, res) {
	res.sendFile(publicPath + '/index.html');
})

db.getRoom('lobby').then(state => {

	const store = createStore(reducer, fromJS(state))

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS())
		socket.on('action', store.dispatch.bind(store))
	})

	io.attach(server)

	store.subscribe((e) => {
		io.emit('state', store.getState().toJS())
		db.updateRoom('lobby', store.getState().toJS())
	})
})

server.listen(
	process.env.PORT || 3000, 
	'0.0.0.0', 
	() => console.log(`listening on ${process.env.PORT || 3000}`)
)
