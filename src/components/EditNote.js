import React, { Component } from 'react'
import './App.css'
import { Subtitle, Field, Label, Control, Input, TextArea, Button, Box } from 'bloomer'
import { Link, Redirect } from 'react-router-dom'
import firebase from './firebase'
import moment from 'moment'

class EditNote extends Component {
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

  componentDidMount () {
    const notesRef = firebase.database().ref(`notes/users/${this.props.user.uid}/${this.props.match.params.noteId}`)
    notesRef.once('value').then(snapshot => {
      console.log(snapshot.val())
      let note = snapshot.val()
      this.setState({
        title: note.title,
        text: note.text,
        tags: note.tags
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.state.title && this.state.text) {
      const notesRef = firebase.database().ref(`notes/users/${this.props.user.uid}/${this.props.match.params.noteId}`)
      notesRef.set({
        title: this.state.title,
        text: this.state.text,
        tags: this.state.tags,
        time: moment(new Date()).format('MMMM Do YYYY, h:mm a')
      })
      this.props.history.push('/')
    }
    // console.log('clicked')
  }

  render () {
    console.log(this.props)
    if (this.props.user) {
      return (
        <div className='EditNote'>
          <Box>
            <Subtitle isSize={3}>Edit Note</Subtitle>
            <form onSubmit={this.handleSubmit} className='add-note-container'>
              <Field className='field'>
                <Label isSize='medium' className='label'>Title</Label>
                <Control>
                  <Input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.handleChange} />
                </Control>
              </Field>

              <Field className='field'>
                <Label isSize='medium' className='label'>Text</Label>
                <Control>
                  <TextArea placeholder='Text' name='text' value={this.state.text} onChange={this.handleChange} />
                </Control>
              </Field>

              <Field className='field'>
                <Label isSize='medium' className='label'>Tags(Optional)</Label>
                <Control>
                  <Input type='text' name='tags' value={this.state.tags} placeholder='Tags' onChange={this.handleChange} />
                </Control>
              </Field>

              <Field>
                <Button isColor='primary' type='submit'>Save</Button>
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

export default EditNote
