'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.INITIAL_STATE = undefined;
exports.setQueue = setQueue;
exports.setState = setState;
exports.getNext = getNext;
exports.playNow = playNow;
exports.addSong = addSong;
exports.addSongNext = addSongNext;
exports.removeSong = removeSong;

var _immutable = require('immutable');

var INITIAL_STATE = exports.INITIAL_STATE = (0, _immutable.Map)({ queue: (0, _immutable.List)(), playing: (0, _immutable.Map)() });

function setQueue(state, queue) {
	return state.set('queue', (0, _immutable.fromJS)(queue));
}

function setState(state) {
	return (0, _immutable.fromJS)(state);
}

function getNext(state) {
	var queue = state.get('queue');

	if (queue && queue.size > 0) {
		return state.merge({
			playing: queue.first(),
			queue: queue.shift()
		});
	} else {
		return state.merge({
			playing: (0, _immutable.Map)({ id: 'YHX22LXN6rA', title: 'Disco!' }),
			queue: _immutable.List.of((0, _immutable.Map)({ id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', thumburl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' }))
		});
	}
}

function playNow(state, song) {
	var queue = state.get('queue').filterNot(function (_song) {
		return _song.get('id') === song.id;
	});
	return state.merge({
		queue: queue,
		playing: (0, _immutable.Map)(song)
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