import { List, Map, fromJS } from 'immutable'

export const INITIAL_STATE = Map({ queue: List(), playing: Map() })

export function setQueue(state, queue) {
	return state.set('queue', fromJS(queue))
}

export function setState(state) {
	return fromJS(state)
}

export function getNext(state) {
	const queue = state.get('queue')

	if (queue && queue.size > 0) {
		return state.merge({
			playing: queue.first(),
			queue: queue.shift()
		})
	} else {
		return state.merge({
			playing: Map({ id: 'YHX22LXN6rA', title: 'Disco!' }),
			queue: List.of(Map({ id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', thumburl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' }))
		})
	}
}

export function playNow(state, song) {
	const queue = state.get('queue').filterNot(_song => _song.get('id') === song.id)
	return state.merge({
		queue: queue,
		playing: Map(song)
	})
}

export function addSong(state, song) {
	const queue = state.get('queue')
	const isInQueue = queue.reduce((prev, curr) => {return (song.id === curr.get('id') || prev)}, false)
	return state.merge({
		queue: isInQueue ? queue : queue.push(Map(song))
	})
}

export function addSongNext(state, song) {
	const queue = state.get('queue').filterNot(_song => _song.get('id') === song.id)
	return state.merge({
		queue: queue.unshift(Map(song))
	})
}

export function removeSong(state, song) {
	const queue = state.get('queue')
	return state.merge({
		queue: queue.filterNot(_song => _song.get('id') === song.id)
	})
}