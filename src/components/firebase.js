import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBntsD0dzM6lf7NG6LF9gCf4lvQGITzsko',
  authDomain: 'note-app-hsw919.firebaseapp.com',
  databaseURL: 'https://note-app-hsw919.firebaseio.com',
  projectId: 'note-app-hsw919',
  storageBucket: 'note-app-hsw919.appspot.com',
  messagingSenderId: '372397426978'
}

firebase.initializeApp(config)
export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
