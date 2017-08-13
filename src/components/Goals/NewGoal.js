// @flow
import React, { Component } from 'react'

import { View, TextInput, ScrollView } from 'react-native'

import Header from './Header'

export default class NewProject extends Component {
  static navigationOptions = {
    title: 'New Project',
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          leftIcon="chevron-left"
          title="New Goal"
          onLeftIconPress={this.handleBackPress}
        />
        <TextInput
          style={{
            fontSize: 30,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}
          placeholder="Goal Name"
        />
      </ScrollView>
    )
  }
}
