import { expect } from 'chai'
import { Map, fromJS } from 'immutable'

import reducer from '../../client/reducer'

describe('client reducer', () => {

	it('handles SET_STATE', () => {
		const initialState = Map()
		const action = {
			type: 'SET_STATE',
			state: {
				queue: [{ id: "9PnOG67flRA", title: "Metronomy - The Bay (Music Video)" }], 
				playing: { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up" }
			}
		}
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			queue: [{ id: "9PnOG67flRA", title: "Metronomy - The Bay (Music Video)" }], 
			playing: { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up" }
		}))
	})
})