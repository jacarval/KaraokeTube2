import React, { Component } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

import * as actionCreators from '../actionCreators'

export class Player extends Component {
  getVideoId() {
    return this.props.videoId || 'YHX22LXN6rA'
  }

  getUser() {
    return this.props.playing.user || ''
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
    const playing = this.props.playing
    const next = this.props.next && this.props.next.first()
    return (
      <div className="fullscreen-video-bg">
        <YouTube
          videoId={this.getVideoId()}
          onEnd={e => this.props.setPlayerState('stop')}
          onError={e => console.log(e)}
          opts={{ playerVars: { showinfo: 0, autoplay: 0 , iv_load_policy: 3 } }}
          className={'player'}
          onReady={e => this.onReady(e)}
          onPlay={e => this.props.setPlayerState('play')}
          onPause={e => this.props.setPlayerState('pause')}
        />
        {this.props.playerState !== 'play' ? 
          <PlayerOverlay
            currTitle={playing && playing.get('title')}
            currUser={playing && playing.get('user')}
            nextTitle={next && next.get('title')}
            nextUser={next && next.get('user')}
            playNext={this.props.playNext}
            playCurr={() => this.props.setPlayerState('play')}
          /> : null 
        }
      </div>
    )
  }
}

const styles = {
  overlay: {
    position: 'absolute',
    // backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: '100', top: '100', left: '100',
    // height: '150px',
    color: 'white',
    textAlign: 'center',
    opacity: '0.9',
    // pointerEvents: 'none',
    borderRadius: '15',
  },
  overlayInner: {
    width: '450px'
  },
  button: {
    borderRadius: '10px'
  }
}

const PlayerOverlay = ({currTitle, currUser, nextTitle, nextUser, playNext, playCurr}) => {
  return <div className="overlay" style={styles.overlay}>
    <div className="playing" style={styles.overlayInner}>
      <button className="button alert" style={styles.button} onClick={playCurr}>
        <h5>Now Playing</h5> 
        <h3>{currUser}</h3>
        <h5>{currTitle && currTitle.length > 40 ? `${currTitle.slice(0, 40)}...` : currTitle}</h5>
      </button>
    </div>
    <div className="up_next" style={styles.overlayInner}>
      <button className="button alert" style={styles.button} onClick={playNext}>
        <h5>Up Next</h5> 
        <h3>{nextUser}</h3>
        <h5>{nextTitle && nextTitle.length > 40 ? `${nextTitle.slice(0, 40)}...` : nextTitle}</h5>
      </button>
    </div>
  </div>
}

function mapStateToProps(state){
  return {
    videoId: state.getIn(['playing', 'id']),
    user: state.getIn(['playing', 'user']),
    title: state.getIn(['playing', 'title']),
    playerState: state.get('playerState'),
    player: state.get('player'),
    previous: state.get('previous'),
    playing: state.get('playing'),
    next: state.get('queue')
  }
}

export const PlayerContainer = connect(mapStateToProps, actionCreators)(Player)