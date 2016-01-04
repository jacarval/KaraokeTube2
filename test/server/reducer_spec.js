import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import reducer from '../../server/reducer'

describe('server reducer', () => {

	it('handles SET_QUEUE', () => {
		const initialState = Map();
		const action = { type: 'SET_QUEUE', queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }] }
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }]
		})) 
	})

	it('handles GET_NEXT', () => {
		const initialState = fromJS({
			playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
			queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }]
		})
		const action = { type: 'GET_NEXT' }
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			playing: { id: 'YQHsXMglC9A', title: 'Adele - Hello' },
			queue: []
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

	it('has an initial state', () => {
		const action = { type: 'SET_QUEUE', queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }] }
		const nextState = reducer(undefined, action)

		expect(nextState).to.equal(fromJS({
			queue: [{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }], playing: {}
		}))
	})

	it('can be used with reduce', () => {
		const action = [
			{
				type: 'SET_ENTRIES', 
				queue: [
					{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' }, 
					{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				]
			},
			{ type: 'GET_NEXT' },
			{ type: 'GET_NEXT' },
			{ type: 'ADD_SONG', song: { id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' } },
			{ type: 'ADD_SONG_NEXT', song: { id: 'uYB2Mqs24ss', title: 'Metronomy - A Thing For Me (Music Video)' } },
			{ type: 'GET_NEXT' }			
		]
		const finalState = action.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			playing: { id: 'uYB2Mqs24ss', title: 'Metronomy - A Thing For Me (Music Video)' },
			queue: [{ id: 'ZCI2cK7AeEg', title: 'Chance the Rapper - "Family Matters"' }]
		}))
	})
})