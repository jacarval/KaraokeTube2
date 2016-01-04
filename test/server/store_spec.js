import { expect } from 'chai'
import { Map, List, fromJS } from 'immutable'
import { createStore } from 'redux'

import reducer from '../../server/reducer'


describe('server store', () => {

	it('is a Redux store configured with the correct reducer', () => {
		const store = createStore(reducer)
		expect(store.getState()).to.equal(Map({ queue: List(), playing: Map() }))

		store.dispatch({
			type: 'SET_QUEUE',
			queue: [
				{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				{ id: 'fJ9rUzIMcZQ', title: 'Queen - Bohemian Rhapsody (Official Video)' },
				{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			]
		})
		
		expect(store.getState()).to.equal(fromJS({
			queue: [
				{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				{ id: 'fJ9rUzIMcZQ', title: 'Queen - Bohemian Rhapsody (Official Video)' },
				{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			],
			playing: {}
		}))
	})
})