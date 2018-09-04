import React, { Component } from 'react'
import './App.css'
import { Subtitle, Field, Label, Control, Input, TextArea, Button, Box } from 'bloomer'
import { Link, Redirect } from 'react-router-dom'
import firebase from './firebase'
import moment from 'moment'

class AddNote extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      text: '',
      tags: '',
      time: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    let date = new Date()
    date = moment(date).format('MMMM Do YYYY, h:mm a')
    // console.log(date)
    e.preventDefault()
    if (this.state.title && this.state.text) {
      const notesRef = firebase.database().ref(`notes/users/${this.props.user.uid}`)
      const note = {
        title: this.state.title,
        text: this.state.text,
        tags: this.state.tags,
        time: date
      }
      notesRef.push(note)
      this.setState({
        title: '',
        text: '',
        tags: '',
        time: ''
      })
      this.props.history.goBack()
    }
    // console.log('clicked')
  }

  render () {
    if (this.props.user) {
      return (
        <div className='AddNote'>
          <Box>
            <Subtitle isSize={3}>Add Note</Subtitle>
            <form onSubmit={this.handleSubmit} className='add-note-container'>
              <Field className='field'>
                <Label isSize='medium' className='label'>Title</Label>
                <Control>
                  <Input type='text' name='title' placeholder='Title' onChange={this.handleChange} />
                </Control>
              </Field>

              <Field className='field'>
                <Label isSize='medium' className='label'>Text</Label>
                <Control>
                  <TextArea placeholder='Text' name='text' onChange={this.handleChange} />
                </Control>
              </Field>

              <Field className='field'>
                <Label isSize='medium' className='label'>Tags(Optional)</Label>
                <Control>
                  <Input type='text' name='tags' placeholder='Tags' onChange={this.handleChange} />
                </Control>
              </Field>

              <Field>
                <Button isColor='primary' type='submit'>Submit</Button>
                <Link to={'/'}>
                  <Button className='delete-button' isColor='danger'>Cancel</Button>
                </Link>
              </Field>
            </form>
          </Box>
        </div>
      )
    } else {
      return <Redirect to={'/'} />
    }
  }
}

export default AddNote
