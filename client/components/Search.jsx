import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import * as actionCreators from '../actionCreators'

const style = {
  searchBarDesktop: {
    position: 'fixed',
    top: 80,
    zIndex: 100,
    right: 50,
    left: 50,
    paddingBottom: 80,
  },
  searchBarMobile: {
    position: 'fixed',
    top: 60,
    right: 0,
    left: 0,
    zIndex: 100,
  },
  resultsPanel: {
    paddingTop: 100,
  }
}

export class Search extends Component {
  getResults() {
    return this.props.results || []
  }

  getQueue() {
    return this.props.queue || []
  }

  showSpinner() {
    return this.props.isSearching ? <i className="fa fa-spinner fa-pulse fa-5x" id="spinner"></i> : ''
  }

  render() {
    const queueIdSet = this.props.queue && new Set(this.props.queue.map(entry => entry.get('id')).toJS())
    return <div className="search">
      <SearchForm search={this.props.search} user={this.props.user} query={this.props.query} />
      <div className="results" style={style.resultsPanel}>
        {this.showSpinner()}
        <div className="row align-middle">
          {this.getResults().map(entry => {
            return <Card key={entry.get('id')}
              inQueue={queueIdSet.has(entry.get('id'))}
              title={entry.get('title')}
              user={entry.get('user')}
              description={entry.get('description')}
              thumburl={entry.get('thumburl')}
              handleSelect={(e) => {this.props.addSong(entry)}}
              handlePlayNext={(e) => this.props.addSongNext(entry)}
              handlePlayNow={e => this.props.playNow(entry)}
            />
          })}
        </div>
      </div>
    </div>  
  }
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {user: this.props.user, query: this.props.query}
  }

  userChange(e) {
    this.setState({user: e.target.value});
  }

  queryChange(e) {
    this.setState({query: e.target.value});
  }

  handleSubmit(e) {
    $('input').blur()
    e.preventDefault()
    const { user, query } = this.state
    if (user && query) {
      this.props.search({ user: user, query: query })
    }
    return e
  }

  render() {
    const { user, query } = this.state
    return  <form onSubmit={e => this.handleSubmit(e)}>
      <div className="row align-center">
       <div className="columns small-12 hide-for-medium" style={style.searchBarMobile}>
          <div className="input-group">
            <span className="input-group-label"><i className="fa fa-user"/></span>
            <input value={user} onChange={e => this.userChange(e)} className="input-group-field" type="text" placeholder="Enter your name" autoCorrect="off" autoComplete="off" autoCapitalize="off"/>
          </div>
          <div className="input-group">
            <span className="input-group-label"><i className="fa fa-music"/></span>
            <input onFocus={e => e.target.value = 'lyrics '} value={query} onChange={e => this.queryChange(e)} className="input-group-field" type="text" placeholder="Enter a song" autoCorrect="off" autoComplete="off" autoCapitalize="off"/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Submit"/>
            </div>
          </div>
        </div>
        <div className="columns small-12 show-for-medium" style={style.searchBarDesktop}>
          <div className="input-group">
            <span className="input-group-label"><i className="fa fa-user"/></span>
            <input value={user} onChange={e => this.userChange(e)} className="input-group-field show-for-medium" type="text" placeholder="Enter your name" autoCorrect="off" autoComplete="off" autoCapitalize="off"/>
            <span className="input-group-label"><i className="fa fa-music"/></span>
            <input onFocus={e => e.target.value = 'lyrics '} value={query} onChange={e => this.queryChange(e)} className="input-group-field" type="text" placeholder="Enter a song" autoCorrect="off" autoComplete="off" autoCapitalize="off"/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Submit"/>
            </div>
          </div>
        </div>
      </div>
    </form>
  }
}

const Card = (props) => {
  return   <div className="large-4 medium-6 small-12 columns">
    <div className="card">
      <div className="image">
        <img src={props.thumburl}/>
        <span className="title"></span>
      </div>
      <div className="content">
        <p>{props.title}</p>
        <small>{props.description}</small>
      </div>
      <div className="action">
        <div className="expanded button-group">
        <a className="button secondary" onClick={props.handlePlayNow}><i className="fa fa-play"/>Now</a>
        <a className="button secondary" onClick={props.handlePlayNext}><i className="fa fa-play"/>Next</a>
        {!props.inQueue ? <a className='button' onClick={props.handleSelect}><i className="fa fa-plus"/>Add</a> : <button className="button disabled">Added</button>}
        </div>
      </div>
    </div>
  </div>
}

function mapStateToProps(state){
  return {
    query: state.get('query'),
    user: state.get('user'),
    results: state.get('results'),
    isSearching: state.get('isSearching'),
    queue: state.get('queue')
  }
}

export const SearchContainer = connect(mapStateToProps, actionCreators)(Search)



