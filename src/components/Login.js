import React, { Component } from 'react'
import './App.css'
import { Button } from 'bloomer'
import { auth, provider } from './firebase'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      user: null
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin () {
    auth.signInWithPopup(provider)
      .then(res => {
        this.props.updateUser(res.user)
      })
  }

  render () {
    return (
      <div className='Login'>
        <Button isColor='primary' onClick={this.handleLogin} isOutlined isSize='medium'>Click here to Login!</Button>
      </div>
    )
  }
}

export default Login
