import React, { Component } from 'react'
import './App.css'
import { Button, Title } from 'bloomer'
import { Link } from 'react-router-dom'
// import Header from './Header'
import firebase from './firebase'
import Note from './Note'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      notes: []
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount () {
    // const notesRef = firebase.database().ref(`notes/users/${this.props.user.uid}`)
    // notesRef.on('value', (snapshot) => {
    //   let notes = snapshot.val()
    //   let newState = []
    //   for (let note in notes) {
    //     newState.push({
    //       id: note,
    //       title: notes[note].title,
    //       text: notes[note].text,
    //       tags: notes[note].tags
    //     })
    //   }
    //   this.setState({
    //     notes: newState
    //   })
    // })
    // notesRef.once('value').then(snapshot => {
    //   let notes = snapshot.val()
    //   let newState = []
    //   for (let note in notes) {
    //     newState.push({
    //       id: note,
    //       title: notes[note].title,
    //       text: notes[note].text,
    //       tags: notes[note].tags
    //     })
    //   }
    //   this.setState({
    //     notes: newState
    //   })
    // })
    this.getData()
  }

  getData () {
    const notesRef = firebase.database().ref(`notes/users/${this.props.user.uid}`)
    notesRef.once('value').then(snapshot => {
      let notes = snapshot.val()
      let newState = []
      for (let note in notes) {
        newState.unshift({
          id: note,
          title: notes[note].title,
          text: notes[note].text,
          tags: notes[note].tags,
          time: notes[note].time
        })
      }
      this.setState({
        notes: newState
      })
    })
  }

  render () {
    return (
      <div className='Dashboard'>
        <Link to={'/add-note'} className='note-button'>
          <Button isOutlined isColor='primary' isSize='medium'>Add Note</Button>
        </Link>

        {this.state.notes.length !== 0 ? (
          <div className='notes-container'>
            {this.state.notes.map((note, idx) => (
              <div key={idx} className='eachnote'>
                <Note note={note} {...this.props} user={this.props.user} getData={this.getData} />
              </div>
            ))}
          </div>
        ) : (
          <div className='no-notes'>
            <Title isSize={3}>You have no notes</Title>
          </div>
        )}

      </div>
    )
  }
}

export default Dashboard
