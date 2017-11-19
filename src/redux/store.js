import firebase from 'react-native-firebase'

import { createStore, combineReducers } from 'redux'
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

import initialState from './initialState'

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
})

const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: true, // enable/disable Firebase's database logging
  enableRedirectHandling: false,
}

export default createStore(
  rootReducer,
  initialState,
  reactReduxFirebase(firebase.app(), config), // pass in react-native-firebase instance instead of config
)
