import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer'

const loggerMiddleware = createLogger({
  stateTransformer: (state) => {
    let newState = state.toJS();
    return newState;
  }
})

const remoteActionMiddleware = socket => store => next => action => {
	if (action.meta && action.meta.remote) {
		socket.emit('action', action)
	}
	return next(action)
}

export default function(socket) {
	return applyMiddleware(
		remoteActionMiddleware(socket),
		thunkMiddleware,
		loggerMiddleware
	)(createStore)(reducer)
}