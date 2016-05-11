import { Map, List, fromJS } from 'immutable'
import { combineReducers } from 'redux'
import isMobile from 'isMobile'

const INITIAL_STATE = Map({ isMobile: isMobile() })

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_PLAYER':
      return state.merge({ player: action.player })
    case 'REQUEST_RESULTS':
      return state.merge(action.search)
    case 'RECEIVE_RESULTS':
      return state.merge(action.search)
    case 'SET_STATE':
      return state.merge(action.state)
  }
  return state
}

