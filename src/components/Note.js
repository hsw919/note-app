import React, { Component } from 'react'
import './App.css'
import { Box, Subtitle, Button } from 'bloomer'
import { Link } from 'react-router-dom'
import firebase from './firebase'

class Note extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    const noteRef = firebase.database().ref(`/notes/users/${this.props.user.uid}/${this.props.note.id}`)
    noteRef.remove()
    this.props.getData()
  }

  render () {
    const note = this.props.note
    return (
      <div className='Note'>
        <Box className='note'>
          {/* <h1>{note.title}</h1> */}
          <p className='time'>{note.time}</p>
          <Subtitle isSize={3}>{note.title}</Subtitle>
          <p className='text'>{note.text}</p>
          <p className='tags'>Tags: <span className='tags-span'>{note.tags}</span></p>
          <div className='buttons'>
            <Link to={`/note/edit/${note.id}`}>
              <Button isColor='primary' isOutlined>Edit</Button>
            </Link>
            <Button className='delete-button' isColor='danger' isOutlined onClick={this.handleDelete}>Delete</Button>
          </div>
        </Box>
      </div>
    )
  }
}

export default Note
