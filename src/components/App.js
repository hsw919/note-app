import React, { Component } from 'react'
import './App.css'
import { Container } from 'bloomer'
import { Route } from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard'
import AddNote from './AddNote'
import EditNote from './EditNote'
import Login from './Login'
import { auth } from './firebase.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null
    }

    this.updateUser = this.updateUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user})
      }
    })
  }

  logoutUser () {
    this.setState({
      user: null
    })
  }

  updateUser (user) {
    this.setState({
      user: user
    })
  }

  render () {
    return (
      <div className='App'>
        <Container hasTextAlign='centered'>
          <Header logoutUser={this.logoutUser} user={this.state.user} />
          {this.state.user
            ? <Route exact path='/' render={props => (
              <Dashboard {...props} user={this.state.user} />
            )} />
            : <Route path='/' render={props => (
              <Login {...props} updateUser={this.updateUser} />
            )} />}
          <Route path='/add-note' render={props => (
            <AddNote {...props} user={this.state.user} />
          )} />
          <Route path='/note/edit/:noteId' render={props => (
            <EditNote {...props} user={this.state.user} />
          )} />
        </Container>
      </div>
    )
  }
}

export default App
