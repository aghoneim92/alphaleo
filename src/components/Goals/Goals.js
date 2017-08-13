// @flow
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { StackNavigator } from 'react-navigation'

import { COLOR_PRIMARY } from '../../constants'

import NewGoal from './NewGoal'
import Header from './Header'

class Goals extends Component {
  handleAddPress = () => {
    this.props.navigation.navigate('NewGoal')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftIcon="bars"
          rightIcon="plus"
          title="Goals"
          onRightIconPress={this.handleAddPress}
        />
      </View>
    )
  }
}

export default StackNavigator(
  {
    Goals: {
      screen: Goals,
    },
    NewGoal: {
      screen: NewGoal,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
)
