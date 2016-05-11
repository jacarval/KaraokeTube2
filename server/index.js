import path from 'path'
import express from 'express'
import { createServer } from 'http'
import socket_io from 'socket.io'
import { createStore } from 'redux'
import { fromJS } from 'immutable'
import reducer from './reducer'
import * as db from './pg_db'
import INITIAL_STATE from './core'
import session from 'express-session'

import applyDevMiddleware from './serverMiddleware'

const publicPath = path.resolve(__dirname, '..' , 'dist')
const app = express()
const server = createServer(app)
const io = socket_io()

applyDevMiddleware(app)

app.use('/dist', express.static(publicPath))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  res.sendFile(publicPath + '/index.html');
})

db.getRoom('lobby').then(state => {

  const store = createStore(reducer, fromJS(state || INITIAL_STATE))

  io.on('connection', (socket) => {

    let cookie = socket.handshake.headers.cookie
    let sessionId =  cookie.slice(cookie.indexOf('connect.sid=') + 12)

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
