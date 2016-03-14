import { INITIAL_STATE, setQueue, setState, getNext, getPrev, addSong, addSongNext, removeSong, playNow, setPlayerState } from './core'

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_PLAYER_STATE':
			return setPlayerState(state, action.state)
		case 'GET_NEXT':
			return getNext(state)
		case 'GET_PREV':
			return getPrev(state)
		case 'ADD_SONG':
			return addSong(state, action.song)
		case 'ADD_SONG_NEXT':
			return addSongNext(state, action.song)
		case 'PLAY_NOW':
			return playNow(state, action.song)
		case 'REMOVE_SONG':
			return removeSong(state, action.song, action.position)
	}
	return state
}