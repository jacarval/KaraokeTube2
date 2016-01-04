import fetch from 'isomorphic-fetch'
import { Map, List } from 'immutable'

function requestResults(query) {
	return {
		type: 'REQUEST_RESULTS',
		search: Map({
			isSearching: true,
			query,
			results: List()
		})
	}
}

function receiveResults(response) {
	const { json, user } = response
	return {
		type: 'RECEIVE_RESULTS',
		search: Map({
			isSearching: false,
			results: List(json.items.map(
				(item) => Map({ 
					user: user,
					id: item.id.videoId, 
					title: item.snippet.title, 
					description: item.snippet.description,
					thumburl: item.snippet.thumbnails.high.url
				})))
		})
	}
}

export function search(request) {
	const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
	const params = '&type=video&maxResults=50&regionCode=US&key=AIzaSyAjZ9Y2YeyNJSk8Ko7T2iY-qTD-8QOUGBE'
	const { query, user } = request

	return dispatch => {

		dispatch(requestResults(query))

		return fetch(`${url}${query}${params}`)
			.then(response => response.json())
			.then(json => dispatch(receiveResults({ json, user })))
			.catch(err => console.log(err))
	}
}

export function setState(state) {
	return {
		type: 'SET_STATE',
		state
	}
}

export function setPlayer(player) {
	return {
		type: 'SET_PLAYER',
		player
	}
}

export function getNext() {
	return {
		meta: { remote: true },
		type: 'GET_NEXT'
	}
}

export function playNow(song) {
	return {
		meta: { remote: true },
		type: 'PLAY_NOW',
		song
	}
}

export function addSong(song) {
	return {
		meta: { remote: true },
		type: 'ADD_SONG',
		song
	}
}

export function addSongNext(song) {
	return {
		meta: { remote: true },
		type: 'ADD_SONG_NEXT',
		song
	}
}

export function removeSong(song) {
	return {
		meta: { remote: true },
		type: 'REMOVE_SONG',
		song
	}
}