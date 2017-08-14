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

  constructor(props, context) {
    super(props, context)

    const { navigation: { state: { params } } } = props

    if (params && params.goal) {
      this.state = params.goal
    }
  }

  state = {
    type: 'financial',
    target: 0,
    achieved: 0,
    deadline: moment().format('DD-MM-YYYY'),
    title: '',
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
  }

  handleFinancialPress = () => {
    this.setState({ type: 'financial' })
  }

  handleTaskPress = () => {
    this.setState({ type: 'task' })
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
    const {
      state: { type, title, target, achieved, deadline },
      props: { firebase, navigation: { state: { params } } },
    } = this

    const values = {
      type,
      title,
      target,
      achieved,
      deadline: moment(deadline, 'DD-MM-YYYY').valueOf(),
    }

    let prom

    if (params && params.goal) {
      prom = firebase.update(`/goals/${params.goal.id}`, values)
    } else {
      prom = firebase
        .push('/goals', values)
        .then(ref =>
          this.props.firebase.update(`/goals/${ref.key}`, { id: ref.key }),
        )
    }

    prom.then(() => this.props.navigation.goBack())
  }

  handleGoalTitleChange = (title: string) => {
    this.setState({ title })
  }

  navigation: any

  render() {
    const {
      props: { navigation: { state: navigationState } },
      state: { title, deadline, target, achieved, type },
    } = this

    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          leftIcon="chevron-left"
          title={
            navigationState.params && navigationState.params.goal
              ? 'Update Goal'
              : 'New Goal'
          }
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
          type={type}
          onFinancialPress={this.handleFinancialPress}
          onTaskPress={this.handleTaskPress}
        />
        <GoalProperties
          type={type}
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
