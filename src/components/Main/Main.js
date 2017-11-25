// @flow

import React, { Component } from 'react'
import { View, Button, Platform } from 'react-native'
import { getFirebase } from 'react-redux-firebase'
import type Firebase from 'react-native-firebase'

import { DrawerNavigator, DrawerItems } from 'react-navigation'

import Messages from '../Messages/Messages'

function setUserToken(token: string) {
  const firebase: Firebase = getFirebase()
  const auth = firebase.auth()
  const database = firebase.database()

  database.ref(`tokens/${auth.currentUser.uid}/${token}`).set(true)
}

// TODO: notification while foregrounded.
async function registerNotifications() {
  try {
    const firebase = getFirebase()
    const messaging = firebase.messaging()

    if (Platform.OS === 'ios') {
      await messaging.requestPermissions()
    }

    const token = await messaging.getToken()
    setUserToken(token)

    messaging.onTokenRefresh(setUserToken)
  } catch (e) {
    // TODO: handle errors
    // eslint-disable-next-line
    console.error(e)
  }
}

function onLogoutPress() {
  const firebase = getFirebase()

  firebase.auth().signOut()
}

const DrawerContent = props => (
  <View>
    <DrawerItems {...props} />
    <Button title="logout" onPress={onLogoutPress} />
  </View>
)

// TODO: customize drawer
const Navigator = DrawerNavigator(
  {
    Announcements: {
      screen: Messages,
    },
  },
  {
    contentComponent: DrawerContent,
  },
)

export default class Main extends Component {
  componentDidMount() {
    registerNotifications()
  }

  render() {
    return <Navigator />
  }
}
