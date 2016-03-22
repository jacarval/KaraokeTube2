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

  componentDidUpdate() {
    const player = this.props.player
    switch(this.props.playerState) {
      case 'play':
        player && player.playVideo(); break;
      case 'pause':
        player && player.pauseVideo(); break;
      case 'stop':
        player && player.stopVideo(); break;
    }
  }

  render() {
    return (
      <div className="fullscreen-video-bg">
        <YouTube
          videoId={this.getVideoId()}
          onEnd={() => this.props.getNext()}
          onError={e => console.log(e)}
          opts={{ playerVars: { showinfo: 0, autoplay: 0 , iv_load_policy: 3 } }}
          className={'player'}
          onReady={e => {this.onReady(e); console.log(e)}}
          onPlay={e => this.props.setPlayerState('play')}
          onPause={e => this.props.setPlayerState('pause')}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    videoId: state.getIn(['playing', 'id']),
    user: state.getIn(['playing', 'user']),
    title: state.getIn(['playing', 'title']),
    playerState: state.get('playerState'),
    player: state.get('player')
  }
}

export const PlayerContainer = connect(mapStateToProps, actionCreators)(Player)