import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import reducer from '../../server/reducer'
import INITIAL_STATE from '../../server/core'

describe('server reducer', () => {

	it('handles GET_NEXT', () => {
		const initialState = fromJS({
			previous: [],
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }]
		})
		const action = { type: 'GET_NEXT' }
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			previous: [{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' }],
			playing: { id: 'YQHsXMglC9A', title: 'Adele - Hello' },
			queue: [],
		}))
	})

	it('handles ADD_SONG', () => {
		const initialState = fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }]
		})
		const action = { type: 'ADD_SONG', song: { id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' } }
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [
				{ id: 'YQHsXMglC9A', title: 'Adele - Hello' },
				{ id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' }
			]
		}))
	})

	it('handles ADD_SONG_NEXT', () => {
		const initialState = fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }]
		})
		const action = { type: 'ADD_SONG_NEXT', song: { id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' } }
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [
				{ id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' },
				{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			]
		}))		
	})



	it('handles REMOVE_SONG', () => {
		const initialState = fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [
				{ id: 'YQHsXMglC9A', title: 'Adele - Hello' },
				{ id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' }
			]
		})
		const action = { type: 'REMOVE_SONG', song: { id: 'YQHsXMglC9A', title: 'Adele - Hello' }, index: 0 }
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [
				{ id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' }
			]
		}))		
	})

	it('can be used with reduce', () => {
		const action = [
			{ type: 'ADD_SONG', song: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' }},
			{ type: 'ADD_SONG', song: { id: 'YQHsXMglC9A', title: 'Adele - Hello' }},
			{ type: 'GET_NEXT' },
			{ type: 'GET_NEXT' },
			{ type: 'ADD_SONG', song: { id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' } },
			{ type: 'ADD_SONG_NEXT', song: { id: 'uYB2Mqs24ss', title: 'Metronomy - A Thing For Me (Music Video)' } },
			{ type: 'GET_NEXT' }			
		]
		const finalState = action.reduce(reducer, INITIAL_STATE);

		expect(finalState).to.equal(fromJS({
			previous: [{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' }, { id: 'YQHsXMglC9A', title: 'Adele - Hello' }],
			playing: { id: 'uYB2Mqs24ss', title: 'Metronomy - A Thing For Me (Music Video)' },
			queue: [{ id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' }],
			playerState: 'stop'
		}))
	})
})