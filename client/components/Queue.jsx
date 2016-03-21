import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import * as actionCreators from '../actionCreators'

export class Queue extends Component {
  getQueue() {
  	return this.props.queue || []
  }

  getPrevious() {
    return this.props.previous || []
  }

  getPlaying() {
    return this.props.playing ? [this.props.playing] : []
  }

  scrollToPlaying() {
    // http://stackoverflow.com/a/21778615
    var el = $("#now_playing");
    var elOffset = el.offset().top;
    var elHeight = el.height();
    var windowHeight = $(window).height();
    var offset;

    if (elHeight < windowHeight) {
      offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
    }
    else {
      offset = elOffset;
    }

    var speed = 1000;
    $('html, body').animate({scrollTop:offset}, speed);
  }

  componentDidMount() {
    this.scrollToPlaying()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playing && this.props.playing && prevProps.playing.get('id') !== this.props.playing.get('id')) {
      this.scrollToPlaying()
    }
  }

  render() {
  	return (
  		<div className="queue" id="queue">
        {this.getPrevious().map(song => {
          return <Previous key={song.get('id')}
            title={song.get('title')}
            user={song.get('user')}
            description={song.get('description')}
            thumburl={song.get('thumburl')}
          />
        })}
        <hr />
        {this.getPlaying().map(song => {
          return <Playing key={song.get('id')}
            title={song.get('title')}
            user={song.get('user')}
            description={song.get('description')}
            thumburl={song.get('thumburl')}
          />
        })}
        <hr />
        {this.getQueue().map(song => {
          return <Next key={song.get('id')}
            title={song.get('title')}
            user={song.get('user')}
            description={song.get('description')}
            thumburl={song.get('thumburl')}
            handleRemove={e => this.props.removeSong(song)}
            handlePlayNext={(e) => this.props.addSongNext(song)}
            handlePlayNow={e => this.props.playNow(song)}
          />
        })}
  		</div>
  	)
  }
}

const Playing = (props) => {
  return <div id="now_playing" className="media-object stack-for-small">
    <div className="media-object-section">
      <div className="thumbnail">
        <img src={props.thumburl}/>
      </div>
    </div>
    <div className="media-object-section main-section">
      <h4>{props.user}</h4>
      <p>{props.title}</p>
          <div className="action">
      <div className="expanded button-group">
        <a className="button success">Now Playing</a>
      </div>
    </div>
    </div>
  </div>
}

const Previous = (props) => {
  return <div className="media-object stack-for-small">
    <div className="media-object-section">
      <div className="thumbnail">
        <img src={props.thumburl}/>
      </div>
    </div>
    <div className="media-object-section main-section">
      <h4>{props.user}</h4>
      <p>{props.title}</p>
          <div className="action">
      <div className="expanded button-group">
        <a className="button disabled">Played</a>
      </div>
    </div>
    </div>
  </div>
}

const Next = (props) => {
  return <div className="media-object stack-for-small">
    <div className="media-object-section">
      <div className="thumbnail">
        <img src={props.thumburl}/>
      </div>
    </div>
    <div className="media-object-section main-section">
      <h4>{props.user}</h4>
      <p>{props.title}</p>
          <div className="action">
      <div className="expanded button-group">
        <a className="button" onClick={props.handlePlayNow}><i className="fa fa-play"/> Now</a>
        <a className="button" onClick={props.handlePlayNext}><i className="fa fa-play"/> Next</a>
        <a className="button" onClick={props.handleRemove}><i className="fa fa-remove"/> Remove</a>
      </div>
    </div>
    </div>
  </div>
}

function mapStateToProps(state){
	return {
    playing: state.get('playing'),
    previous: state.get('previous'),
		queue: state.get('queue')
	}
}

export const QueueContainer = connect(mapStateToProps, actionCreators)(Queue)