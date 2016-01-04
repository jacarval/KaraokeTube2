import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actionCreators from '../actionCreators'

export class App extends Component {
	constructor(props) {
		super(props)
	}

	stop(e) {
		this.props.player.stopVideo()
	}

	pause(e) {
		this.props.player.pauseVideo()
	}

	prev(e) {
		this.props.player.seekTo(0)
	}

	play(e) {
		this.props.player.playVideo()
	}

	next(e) {
		this.props.getNext()
	}

	render() {
		return <OffCanvasWrapper>
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="dropdown menu align-middle" data-dropdown-menu>
						<li className="menu float-left" id="brand">
							<Link className="button" to="/">
								<span className="karaoke">Karaoke</span>
								<span className="tube">Tube</span>
							</Link>
						</li>
						<li className="show-for-medium has-submenu">
							<Link className="button" to="/player">Player</Link>
							<ul className="submenu menu vertical" data-submenu>
								<Link className="button" to="/player" target="_blank">New Window</Link>
							</ul>
						</li>
						<li className="show-for-medium"><Link className="button" to="/queue">Queue</Link></li>
						<li className="show-for-medium"><Link className="button" to="/search">Search</Link></li>
						<li className="float-right hide-for-medium"><button type="button" className="button" data-toggle="offCanvas"><i className="fa fa-bars"/></button></li>
					</ul>
				</div>
				<div className="top-bar-right show-for-medium">
					<ul className="menu">
						{/*<li><a className="button" ><i className="fa fa-undo"/></a></li>*/}
						<li><a className="button" onClick={e => this.stop(e)}><i className="fa fa-stop"/></a></li>
						<li><a className="button" onClick={e => this.pause(e)}><i className="fa fa-pause"/></a></li>
						<li><a className="button" onClick={e => this.prev(e)}><i className="fa fa-step-backward"/></a></li>
						<li><a className="button" onClick={e => this.play(e)}><i className="fa fa-play"/></a></li>
						<li><a className="button" onClick={e => this.next(e)}><i className="fa fa-step-forward"/></a></li>
						<li><button type="button" className="button" data-toggle="offCanvas"><i className="fa fa-bars"/></button></li>
					</ul>
				</div>
			</div>
			{this.props.children}
		</OffCanvasWrapper>
	}
}

const OffCanvasWrapper = (props) => {
	return <div className="off-canvas-wrapper">
		<div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
			<div className="off-canvas position-right" id="offCanvas" data-off-canvas data-position="right">
				<ul className="vertical menu" data-drilldown>
					<li><Link to="/queue">Queue</Link></li>
					<li><Link to="/search">Search</Link></li>
					{/*<li>
						<a href="#">Rooms</a>
						<ul className="nested vertical menu">
							<li><a href="#">Lobby</a></li>
						</ul>
					</li>*/}
					<li><a href="https://github.com/jacarval/karaoketube-dev">GitHub</a></li>
				</ul>
			</div>
			<div className="off-canvas-content" data-off-canvas-content>
				{props.children}
			</div>
		</div>
	</div>
}

function mapStateToProps(state){
	return {
		queue: state.get('queue'),
		playing: state.get('playing'),
		player: state.get('player')
	}
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)

