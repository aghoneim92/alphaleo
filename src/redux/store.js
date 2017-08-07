import RNFirebase from 'react-native-firebase'
import initialState from './initialState'

import { combineReducers } from 'redux'
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

import { createStore, compose } from 'redux'

const configurationOptions = {
  debug: true,
}

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
})

const firebase = RNFirebase.initializeApp(configurationOptions)

const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: true, // enable/disable Firebase's database logging
  enableRedirectHandling: false,
}

export default createStore(
  rootReducer,
  initialState,
  reactReduxFirebase(firebase, config), // pass in react-native-firebase instance instead of config
)
