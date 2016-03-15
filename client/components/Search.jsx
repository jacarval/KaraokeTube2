import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import * as actionCreators from '../actionCreators'

export class Search extends Component {
  constructor(props) {
    super(props)
  }

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
    return <div className="search">
      <SearchForm search={this.props.search} user={this.props.user} query={this.props.query} />
      <div className="results">
        {this.showSpinner()}
        <div className="row align-middle">
          {this.getResults().map(entry => {
            return <Card key={entry.get('id')}
              title={entry.get('title')}
              user={entry.get('user')}
              description={entry.get('description')}
              thumburl={entry.get('thumburl')}
              handleSelect={(e) => {this.props.addSong(entry); console.log(e.target.className += ' disabled')}} // this needs to be fixed
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
        <div className="small-12 medium-4 columns">
          <div className="input-group">
            <span className="input-group-label"><i className="fa fa-user"/></span>
            <input value={user} onChange={e => this.userChange(e)} className="input-group-field" type="text" placeholder="Enter your name"/>
          </div>
        </div>
        <div className="small-12 medium-4 columns">
          <div className="input-group">
            <span className="input-group-label"><i className="fa fa-music"/></span>
            <input value={query} onChange={e => this.queryChange(e)} className="input-group-field" type="text" placeholder="Enter a song"/>
          </div>
        </div>
        <div className="shrink columns">
          <input type="submit" className="button" value="Submit"/>
        </div>
      </div>
    </form>
  }
}

const Card = (props) => {
  return   <div className="medium-4 small-12 columns">
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
        <a className="button" onClick={props.handlePlayNow}><i className="fa fa-play"/> Now</a>
        <a className="button" onClick={props.handlePlayNext}><i className="fa fa-play"/> Next</a>
        <a className="button" onClick={props.handleSelect}><i className="fa fa-plus"/> Add</a>
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
    isSearching: state.get('isSearching')
  }
}

export const SearchContainer = connect(mapStateToProps, actionCreators)(Search)



