import '../video/discoball.mp4'
import '../images/discoball.png'


import React, { Component } from 'react'

export class Home extends Component {
	render() {
		return (
			<div className="fullscreen-video-bg">
				<video preload autoPlay loop className="cover show-for-medium">
					<source src="dist/videos/discoball.mp4" type="video/mp4" />
				</video>
			</div>
		)
	}
}