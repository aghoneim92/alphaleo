// @flow
import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ProgressBarClassic from 'react-native-progress-bar-classic'

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
import moment from 'moment'

import NewGoal from './NewGoal'
import Header from './Header'

const Goal = ({ id, title, type, achieved, target, deadline, firebase }) =>
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
    <CardContent>
      <Text>
        {`Target: LE ${target}, Achieved: LE ${achieved}, Deadline: ${moment(
          deadline,
        ).format('DD-MM-YY')}`}
      </Text>
      <View
        style={{
          margin: 20,
          marginLeft: 40,
        }}
      >
        <ProgressBarClassic
          progress={target === 0 ? 0 : 100 * achieved / target}
          valueStyle="balloon"
        />
      </View>
    </CardContent>
    <CardAction seperator inColumn={false}>
      <CardButton onPress={() => {}} title="Done" color="blue" />
      <CardButton
        onPress={() => {
          firebase.ref(`goals/${id}`).remove()
        }}
        title="Delete"
        color="blue"
      />
    </CardAction>
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
    const { firebase, goals } = this.props

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
            ? values(goals).map(goal =>
                <Goal key={goal.id} firebase={firebase} {...goal} />,
              )
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
