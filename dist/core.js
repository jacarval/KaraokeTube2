'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;
exports.getNext = getNext;
exports.getPrev = getPrev;
exports.playNow = playNow;
exports.addSong = addSong;
exports.addSongNext = addSongNext;
exports.removeSong = removeSong;
exports.setPlayerState = setPlayerState;

var _immutable = require('immutable');

var INITIAL_STATE = exports.INITIAL_STATE = (0, _immutable.fromJS)({
  previous: [{ user: 'doorbot', id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', thumburl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }],
  playing: null,
  queue: [],
  playerState: 'stop'
});

function getNext(state) {
  var previous = state.get('previous') || [];
  var playing = state.get('playing');
  var queue = state.get('queue');

  if (queue && queue.size > 0) {
    return state.merge({
      previous: playing ? previous.push(playing) : previous,
      playing: queue.first(),
      queue: queue.shift(),
      playerState: 'stop'
    });
  } else {
    return state;
  }
}

function getPrev(state) {
  var previous = state.get('previous') || [];
  var playing = state.get('playing');
  var queue = state.get('queue');

  if (previous && previous.size > 0) {
    return state.merge({
      playing: previous.last(),
      previous: previous.pop(),
      queue: playing ? queue.unshift(playing) : queue,
      playerState: 'stop'
    });
  } else {
    return state;
  }
}

function playNow(state, song) {
  var previous = state.get('previous') || [];
  var playing = state.get('playing');
  var queue = state.get('queue').filterNot(function (_song) {
    return _song.get('id') === song.id;
  });
  return state.merge({
    previous: playing ? previous.push(playing) : previous,
    playing: (0, _immutable.Map)(song),
    queue: queue
  });
}

function addSong(state, song) {
  var queue = state.get('queue');
  var isInQueue = queue.reduce(function (prev, curr) {
    return song.id === curr.get('id') || prev;
  }, false);
  return state.merge({
    queue: isInQueue ? queue : queue.push((0, _immutable.Map)(song))
  });
}

function addSongNext(state, song) {
  var queue = state.get('queue').filterNot(function (_song) {
    return _song.get('id') === song.id;
  });
  return state.merge({
    queue: queue.unshift((0, _immutable.Map)(song))
  });
}

function removeSong(state, song) {
  var queue = state.get('queue');
  return state.merge({
    queue: queue.filterNot(function (_song) {
      return _song.get('id') === song.id;
    })
  });
}

function setPlayerState(state, playerState) {
  return state.merge({
    playerState: playerState
  });
}