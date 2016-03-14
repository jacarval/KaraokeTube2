import './styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import io from 'socket.io-client'

import makeStore from './store'
import { search, setState, addSong, addSongNext, removeSong, getNext } from './actionCreators'

/* COMPONENTS 
 ====================================================================== */
import { AppContainer } from './components/App'
import { PlayerContainer } from './components/Player'
import { SearchContainer } from './components/Search'
import { QueueContainer } from './components/Queue'
import { Home } from './components/Home'

const socket = io()
const store = makeStore(socket)

socket.on('state', state => 
	store.dispatch(setState(state))
)

ReactDOM.render( 
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route component={AppContainer}>
				<Route path="/" component={Home} />
				<Route path="player" component={PlayerContainer} />
				<Route path="search" component={SearchContainer} />
				<Route path="queue" component={QueueContainer} />
			</Route>
		</Router>
	</Provider>, 
	document.getElementById('root')
)