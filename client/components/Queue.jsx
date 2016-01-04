import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import * as actionCreators from '../actionCreators'

export class Queue extends Component {
  getQueue() {
  	return this.props.queue || []
  }

  render() {
  	return (
  		<div className="queue">
        <div className="container">
          <div className="row align-middle">
            {this.getQueue().map(song => {
              return <Card key={song.get('id')}
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
  		</div>
  	)
  }
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

const CardColumns = (props) => {
  return <div className="card-columns">
    {props.children}
  </div>
}

function mapStateToProps(state){
	return {
		queue: state.get('queue')
	}
}

export const QueueContainer = connect(mapStateToProps, actionCreators)(Queue)