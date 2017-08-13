// @flow
import React, { Component } from 'react'

import { View, Text, TextInput, ScrollView } from 'react-native'

import Button from 'apsl-react-native-button'

import { firebaseConnect } from 'react-redux-firebase'

import moment from 'moment'

import Header from './Header'
import GoalType from './GoalType'
import GoalProperties from './GoalProperties'

import { COLOR_PRIMARY } from '../../constants'

@firebaseConnect()
export default class NewGoal extends Component {
  static navigationOptions = {
    title: 'New Project',
  }

  state = {
    goalType: 'financial',
    target: 0,
    achieved: 0,
    deadline: new Date(),
    title: '',
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
  }

  handleFinancialPress = () => {
    this.setState({ goalType: 'financial' })
  }

  handleTaskPress = () => {
    this.setState({ goalType: 'task' })
  }

  handleTargetChange = (target: number) => {
    this.setState({ target })
  }

  handleAchievedChange = (achieved: number) => {
    this.setState({ achieved })
  }

  handleDateChange = (deadline: Date) => {
    this.setState({ deadline })
  }

  handleSavePress = () => {
    this.props.firebase
      .push('/goals', {
        type: this.state.goalType,
        title: this.state.title,
        target: this.state.target,
        achieved: this.state.achieved,
        deadline: this.state.deadline.getTime(),
      })
      .then(ref =>
        this.props.firebase.update(`/goals/${ref.key}`, { id: ref.key }),
      )
      .then(() => this.props.navigation.goBack())
  }

  handleGoalTitleChange = (title: string) => {
    this.setState({ title })
  }

  render() {
    const { title, deadline, target, achieved, goalType } = this.state

    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          leftIcon="chevron-left"
          title="New Goal"
          onLeftIconPress={this.handleBackPress}
        />
        <TextInput
          style={{
            fontSize: 20,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}
          autoFocus
          value={title}
          underlineColorAndroid="transparent"
          placeholder="Goal Name"
          onChangeText={this.handleGoalTitleChange}
        />
        <GoalType
          goalType={goalType}
          onFinancialPress={this.handleFinancialPress}
          onTaskPress={this.handleTaskPress}
        />
        <GoalProperties
          goalType={goalType}
          target={target}
          achieved={achieved}
          deadline={deadline}
          onTargetChange={this.handleTargetChange}
          onAchievedChange={this.handleAchievedChange}
          onDateChange={this.handleDateChange}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 10,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{
              backgroundColor: COLOR_PRIMARY,
              width: '20%',
              height: 35,
              marginRight: 15,
              borderColor: 'transparent',
            }}
            textStyle={{ color: 'white', fontSize: 15 }}
            onPress={this.handleSavePress}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    )
  }
}
