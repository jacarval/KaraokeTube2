import { List, Map, fromJS } from 'immutable'

export const INITIAL_STATE = fromJS(
  { 
    previous: [{ user: 'doorbot', id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', thumburl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'}],
    playing: null, 
    queue: [],
    playerState: 'stop'
  }
)

export function getNext(state) {
  const previous = state.get('previous') || []
  const playing = state.get('playing')
  const queue = state.get('queue')

  if (queue && queue.size > 0) {
    return state.merge({
      previous: playing ? previous.push(playing) : previous,
      playing: queue.first(),
      queue: queue.shift(),
      playerState: 'stop'
    })
  } else {
    return state
  }
}

export function getPrev(state) {
  const previous = state.get('previous') || []
  const playing = state.get('playing')
  const queue = state.get('queue')

  if (previous && previous.size > 0) {
    return state.merge({
      playing: previous.last(),
      previous: previous.pop(),
      queue: playing ? queue.unshift(playing) : queue,
      playerState: 'stop'
    })
  } else {
    return state
  }
}

export function playNow(state, song) {
  const previous = state.get('previous') || []
  const playing = state.get('playing')
  const queue = state.get('queue').filterNot(_song => _song.get('id') === song.id)
  return state.merge({
    previous: playing ? previous.push(playing) : previous,
    playing: Map(song),
    queue: queue
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

export function setPlayerState(state, playerState) {
  return state.merge({
    playerState: playerState
  })  
} 