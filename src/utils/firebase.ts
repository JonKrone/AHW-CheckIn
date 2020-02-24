// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCCpWsrS-FO4q48gxqxmP10735GJk3SV4o',
  authDomain: 'anniehayeswellness-221818.firebaseapp.com',
  databaseURL: 'https://anniehayeswellness-221818.firebaseio.com',
  projectId: 'anniehayeswellness-221818',
  storageBucket: 'anniehayeswellness-221818.appspot.com',
  messagingSenderId: '1026415276139',
})

// Initialize Cloud Firestore through Firebase
export const fDb = firebase.firestore()

// Enable some offline redundancy
// fDb.enablePersistence()

// Sign in to an anonymous session
firebase
  .auth()
  .signInAnonymously()
  .catch((error: Error) => {
    console.error('Hey! Error signing in to firebase anonymously:', error)
    alert(`Hey!

We had a problem starting up. Can you refresh or turn off your adblocker for this page?

If that doesn't fix it: ignore this message, keep using the site, and let Jonathan know :)`)
  })
