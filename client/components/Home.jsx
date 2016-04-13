import '../video/discoball.mp4'
import '../images/discoball.png'

import { Link } from 'react-router'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="fullscreen-video-bg">
          <video preload autoPlay loop className="cover">
            {this.props.isMobile ? '' : <source src="dist/videos/discoball.mp4" type="video/mp4" />}
          </video>

        </div>
        <div className="landing">
          {this.props.isMobile ? '' : <Link className="button expanded show-for-medium" to="/player">Player</Link>}
          <Link className="button expanded" to="/queue">Queue</Link>
          <Link className="button expanded" to="/search">Search</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    isMobile: state.get('isMobile')
  }
}

export const HomeContainer = connect(mapStateToProps)(Home)