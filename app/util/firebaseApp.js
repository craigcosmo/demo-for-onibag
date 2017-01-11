import * as firebase from 'firebase'
import config from 'config'

export default firebase.initializeApp(config.firebase)

export const db = firebase.database()

export const auth = firebase.auth()

// console.log(auth)