import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'

import { setQueue, getNext, addSong, addSongNext, removeSong, playNow, INITIAL_STATE } from '../../server/core'

describe('server application logic', () => {

	describe('getNext', () => {

		it('gets the next video to play', () => {
			const state = fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E'],
				current: 0
			})
			const nextState = getNext(state)

			expect(nextState).to.equal(fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E'],
				current: 1
			}))
		})
	})

	describe('addSong', () => {

		it('adds a song to the end of the queue', () => {
			const state = fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E'],
				current: 0
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = addSong(state, song)

			expect(nextState).to.equal(fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					'YQHsXMglC9A': { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E', 'YQHsXMglC9A'],
				current: 0
			}))
		})
	})

	describe('addSongNext', () => {

		it('adds a song to the end of the queue', () => {
			const state = fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E'],
				current: 0
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = addSongNext(state, song)

			expect(nextState).to.equal(fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					'YQHsXMglC9A': { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				},
				queue: ['rejA6QRtrAI', 'YQHsXMglC9A', 'lZoxdPGu_4E'],
				current: 0
			}))
		})	
	})

	describe('playNow', () => {

		it('immediately plays a song', () => {
			const state = fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E'],
				current: 0
			})
			const song = { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
			const nextState = playNow(state, song)

			expect(nextState).to.equal(fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					'YQHsXMglC9A': { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				},
				queue: ['YQHsXMglC9A', 'rejA6QRtrAI', 'lZoxdPGu_4E'],
				current: 1
			}))
		})
	})

	describe('removeSong', () => {

		it('removes a specified song from the queue', () => {
			const state = fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					'YQHsXMglC9A': { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				},
				queue: ['rejA6QRtrAI', 'lZoxdPGu_4E', 'YQHsXMglC9A'],
				current: 1
			})
			const song = Map({ id: 'YQHsXMglC9A', title: 'Adele - Hello' })
			const nextState = removeSong(state, song, 2)

			expect(nextState).to.equal(fromJS({
				videos: {
					'rejA6QRtrAI': { id: 'rejA6QRtrAI', title: 'D\'Angelo and The Vanguard - Betray My Heart' },
					'lZoxdPGu_4E': { id: 'lZoxdPGu_4E', title: 'D\'Angelo and The Vanguard - Ain\'t that easy' },
					'YQHsXMglC9A': { id: 'YQHsXMglC9A', title: 'Adele - Hello' }
				},
				queue: ['rejA6QRtrAI','lZoxdPGu_4E'],
				current: 1
			}))
		})	
	})
})