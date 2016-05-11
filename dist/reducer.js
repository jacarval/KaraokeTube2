'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _core = require('./core');

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? _core.INITIAL_STATE : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'SET_PLAYER_STATE':
      return (0, _core.setPlayerState)(state, action.state);
    case 'GET_NEXT':
      return (0, _core.getNext)(state);
    case 'GET_PREV':
      return (0, _core.getPrev)(state);
    case 'ADD_SONG':
      return (0, _core.addSong)(state, action.song);
    case 'ADD_SONG_NEXT':
      return (0, _core.addSongNext)(state, action.song);
    case 'PLAY_NOW':
      return (0, _core.playNow)(state, action.song);
    case 'REMOVE_SONG':
      return (0, _core.removeSong)(state, action.song, action.position);
  }
  return state;
}