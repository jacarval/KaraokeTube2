import { List, Map, fromJS } from 'immutable'

export const INITIAL_STATE = fromJS(
	{ 
		current: 0,
		queue: [],
		videos: {},
	}
)

export function setState(state) {
	return fromJS(state)
}

export function getNext(state) {
	const queue = state.get('queue')
	const current = state.get('current')
	if (queue && queue.size > current + 1) {
		return state.merge({
			current: current + 1
		})
	}
}

export function playNow(state, song) {
	const current = state.get('current')
	const queue = state.get('queue')
	const videos = state.get('videos')
	return state.merge({
		videos: videos.set(song.id, Map(song)),
		queue: queue.insert(current, song.id),
		current: current + 1
	})
}

export function addSong(state, song) {
	const queue = state.get('queue')
	const videos = state.get('videos') 
	return state.merge({
		queue: queue.push(song.id),
		videos: videos.set(song.id, Map(song))
	})
}

export function addSongNext(state, song) {
	const current = state.get('current')
	const queue = state.get('queue')
	const videos = state.get('videos')
	return state.merge({
		videos: videos.set(song.id, Map(song)),
		queue: queue.insert(current + 1, song.id)
	})
}

export function removeSong(state, song, position) {
	const queue = state.get('queue')
	const videos = state.get('videos')
	return state.merge({
		videos: videos.filterNot(_song => _song.get('id') === song.id),
		queue: queue.delete(position)
	})
}