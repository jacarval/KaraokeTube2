import '../video/discoball.mp4'
import '../images/discoball.png'

import { Link } from 'react-router'
import React, { Component } from 'react'

export class Home extends Component {
	render() {
	return (
		<div className="home">
			<div className="fullscreen-video-bg">
				<video preload autoPlay loop className="cover show-for-medium">
					<source src="dist/videos/discoball.mp4" type="video/mp4" />
				</video>
			</div>
			<div className="row align-middle align-spaced">
				<div className="column show-for-medium">
					<Link className="button expanded" to="/player">Player</Link>
				</div>
				<div className="column">
					<Link className="button expanded" to="/queue">Queue</Link>
				</div>
				<div className="column">
					<Link className="button expanded" to="/search">Search</Link>
				</div>
			</div>
		</div>
		)
	}
}