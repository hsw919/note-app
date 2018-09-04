import React, { Component } from 'react'
import './App.css'
import { Title, Icon, Button } from 'bloomer'
// import { Route } from 'react-router-dom'
import { auth } from './firebase.js'

class Header extends Component {
  constructor () {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    auth.signOut()
    this.props.logoutUser()
  }

  render () {
    return (
      <div className='Header'>
        <Title isSize={1} className='header-title'>Notes <Icon isSize='large' className='far fa-clipboard header-icon' /></Title>
        {this.props.user && <Button className='logout' onClick={this.handleLogout}>Logout</Button>}

        <hr />
      </div>
    )
  }
}

export default Header
