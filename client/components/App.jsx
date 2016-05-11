import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actionCreators from '../actionCreators'

export class App extends Component {
  stop(e) {
    this.props.setPlayerState('stop')
  }

  pause(e) {
    this.props.setPlayerState('pause')
  }

  prev(e) {
    this.props.getPrev()
  }

  play(e) {
    this.props.setPlayerState('play')
  }

  next(e) {
    this.props.getNext()
  }

  render() {
    return <OffCanvasWrapper>
      <div className="top-bar" id="top-bar">
        <div className="">
          <ul className="dropdown menu align-left" data-dropdown-menu>
            <li id="brand">
              <Link className="button" to="/">
                <span className="karaoke">Karaoke</span>
                <span className="tube">Tube</span>
              </Link>
            </li>
            {this.props.isMobile ? '' : <li className="show-for-medium"><Link className="button" to="/player">Player</Link></li>}
            <li className="show-for-medium"><Link className="button" to="/queue">Queue</Link></li>
            <li className="show-for-medium"><Link className="button" to="/search">Search</Link></li>
          </ul>
        </div>
        <div className="">
          <ul className="menu show-for-medium align-right">
            {/*<li><a className="button" ><i className="fa fa-undo"/></a></li>*/}
            <li><a className="button" onClick={e => this.stop(e)}><i className="fa fa-stop"/></a></li>
            <li><a className="button" onClick={e => this.pause(e)}><i className="fa fa-pause"/></a></li>
            <li><a className="button" onClick={e => this.prev(e)}><i className="fa fa-step-backward"/></a></li>
            <li><a className="button" onClick={e => this.play(e)}><i className="fa fa-play"/></a></li>
            <li><a className="button" onClick={e => this.next(e)}><i className="fa fa-step-forward"/></a></li>
            <li><button type="button" className="button" data-toggle="offCanvas"><i className="fa fa-bars"/></button></li>
          </ul>
          <ul className="menu hide-for-medium">
            <li className="hide-for-medium"><button type="button" className="button" data-toggle="offCanvas"><i className="fa fa-bars"/></button></li>
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
          <li><Link data-toggle="offCanvas" to="/queue">Queue</Link></li>
          <li><Link data-toggle="offCanvas" to="/search">Search</Link></li>
          <li><a href="https://github.com/jacarval/KaraokeTube2">GitHub</a></li>
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
    isMobile: state.get('isMobile'),
    showUpNext: state.get('showUpNext')
  }
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App)

