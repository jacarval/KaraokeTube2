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

  componentDidMount() {
    document.getElementById("now_playing").scrollIntoView()
  }

  render() {
  	return (
  		<div className="queue">
        <div className="container">
            {this.getPrevious().map(song => {
              return <Previous key={song.get('id')}
                title={song.get('title')}
                user={song.get('user')}
                description={song.get('description')}
                thumburl={song.get('thumburl')}
              />
            })}
            {this.getPlaying().map(song => {
              return <Playing key={song.get('id')}
                title={song.get('title')}
                user={song.get('user')}
                description={song.get('description')}
                thumburl={song.get('thumburl')}
              />
            })}
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

const Card = (props) => {
  return   <div className="small-12 medium-4 columns">
    <div className="card">
      <div className="image">
        <img src={props.thumburl}/>
        <span className="title">{props.user}</span>
      </div>
      <div className="content">
        <p>{props.title}</p>
        <small>{props.description}</small>
      </div>
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