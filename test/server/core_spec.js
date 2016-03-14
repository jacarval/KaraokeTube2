import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'

import { setQueue, getNext, addSong, addSongNext, removeSong, playNow } from '../../server/core'

describe('server application logic', () => {

	describe('getNext', () => {

		it('gets the next video to play', () => {
			const state = fromJS({
				playing: null,
				queue: [
					{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: []
			})
			const nextState = getNext(state)

			expect(nextState).to.equal(fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: []
			}))
		})
	})

	describe('addSong', () => {

		it('adds a song to the end of the queue', () => {
			const state = fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: []
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = addSong(state, song)

			expect(nextState).to.equal(fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				],
				previous: []
			}))
		})
	})

	describe('addSongNext', () => {

		it('adds a song to the beginning of the queue', () => {
			const state = fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: []
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = addSongNext(state, song)

			expect(nextState).to.equal(fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'YQHsXMglC9A', title: 'Adele - Hello' },
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: []
			}))
		})
	})

	describe('playNow', () => {

		it('immediately plays a song', () => {
			const state = fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: []
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = playNow(state, song)

			expect(nextState).to.equal(fromJS({
				playing: { id: 'YQHsXMglC9A', title: 'Adele - Hello' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				],
				previous: [{ id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' }]
			}))
		})

	})

	describe('removeSong', () => {

		it('removes a specified song from the queue', () => {
			const state = fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					{ id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				],
				previous: []
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = removeSong(state, song, 1)

			expect(nextState).to.equal(fromJS({
				playing: { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
				queue: [
					{ id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }			
				],
				previous: []
			}))
		})
	})
})