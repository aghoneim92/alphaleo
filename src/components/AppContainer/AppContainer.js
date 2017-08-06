// @flow
import React, { Component } from 'react'

import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
@connect(({ firebase: { auth } }) => ({
  auth,
}))
export default class AppContainer extends Component {
  static propTypes: {
    auth: {
      isEmpty: boolean,
      isLoaded: boolean,
    },
  }

  render() {
    const { auth: { isLoaded, isEmpty } } = this.props

    console.log('isLoaded', isLoaded, 'isempty', isEmpty)

    if (isLoaded) {
      if (isEmpty) {
        return (
          <View style={{ flex: 1 }}>
            <Text>Login</Text>
          </View>
        )
      }

      return (
        <View style={{ flex: 1 }}>
          <Text>Welcome</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <Text>Loading</Text>
      </View>
    )
  }
}
