// @flow
import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards'

import { StackNavigator } from 'react-navigation'

import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

import { values } from 'ramda'

import NewGoal from './NewGoal'
import Header from './Header'

const Goal = ({ id, title, type, achieved, target, deadline }) =>
  <Card>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialIcon
        backgroundColor="transparent"
        size={40}
        iconStyle={{ color: 'black' }}
        name="attach-money"
      />
      <CardTitle title={title} />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>
        {`Target: LE ${target}`}
      </Text>
      <Text>
        {`Achieved: LE ${achieved}`}
      </Text>
    </View>
  </Card>

@firebaseConnect(['goals'])
@connect(({ firebase: { data: { goals } } }) => ({
  goals,
}))
class Goals extends Component {
  handleAddPress = () => {
    this.props.navigation.navigate('NewGoal')
  }

  render() {
    const { goals } = this.props

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftIcon="bars"
          rightIcon="plus"
          title="Goals"
          onRightIconPress={this.handleAddPress}
        />
        <ScrollView style={{ flex: 1 }}>
          {goals
            ? values(goals).map(goal => <Goal key={goal.id} {...goal} />)
            : null}
        </ScrollView>
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
