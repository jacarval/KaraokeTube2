import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

import * as actionCreators from '../actionCreators'

export class Player extends Component {
  constructor(props) {
    super(props)
  }

  getVideoId() {
    return this.props.videoId || 'YHX22LXN6rA'
  }

  getUser() {
    return this.props.user || ''
  }

  onReady(event) {
    this.props.setPlayer(event.target)
  }

  render() {
    return (
      <div className="fullscreen-video-bg">
        <YouTube
          videoId={this.getVideoId()}
          onEnd={() => this.props.getNext()}
          onError={() => this.props.getNext()}
          opts={{ playerVars: { showinfo: 0, autoplay: 1 , iv_load_policy: 3 } }}
          className={'player'}
          onReady={e => this.onReady(e)}
        />
        <div data-alert className="alert-box success">
          <i className="fi-check"></i> {`${this.props.user} - ${this.props.title}`} 
          <a href="#" className="close">&CircleTimes;</a>
        </div>    
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    videoId: state.getIn(['playing', 'id']),
    user: state.getIn(['playing', 'user']),
    title: state.getIn(['playing', 'title'])
  }
}

export const PlayerContainer = connect(mapStateToProps, actionCreators)(Player)