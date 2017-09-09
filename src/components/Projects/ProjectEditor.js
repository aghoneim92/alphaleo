// @flow
import React, { PureComponent } from 'react'
import { View, TextInput, ScrollView } from 'react-native'
import Button from 'apsl-react-native-button'

import type { Navigation } from 'react-navigation'

import { firebaseConnect } from 'react-redux-firebase'

import { Map, List } from 'immutable'

import Header from './Header'
import ProjectProperties from './ProjectProperties'

import { COLOR_PRIMARY } from '../../constants'

@firebaseConnect()
export default class ProjectEditor extends PureComponent {
  static navigationOptions = {
    title: 'New Project',
  }

  constructor(props, context) {
    super(props, context)

    const { navigation: { state: { params } } } = props

    if (params && params.project) {
      this.state = params.project
    }
  }

  state = {
    financials: Map({
      target: 0,
      achieved: 0,
      deadline: Date.now(),
    }),
    tasks: List(),
    title: '',
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
  }

  handleFinancialsChange = (financials: Map) => {
    this.setState({ financials })
  }

  handleTasksChange = (tasks: List) => {
    this.setState({ tasks })
  }

  handleSavePress = () => {
    const {
      state: { id, title, financials, tasks },
      props: { firebase },
    } = this

    const values = { title, financials: financials.toJS(), tasks: tasks.toJS() }

    let prom

    if (id) {
      prom = firebase.update(`/projects/${id}`, values)
    } else {
      prom = firebase
        .push('/projects', values)
        .then(ref =>
          this.props.firebase.update(`/projects/${ref.key}`, { id: ref.key }),
        )
    }

    prom.then(() => {
      this.props.navigation.goBack()
    })
  }

  handleGoalTitleChange = (title: string) => {
    this.setState({ title })
  }

  navigation: Navigation

  render() {
    const {
      props: { navigation: { state: navigationState } },
      state: { title, financials, tasks },
      handleFinancialsChange,
      handleTasksChange,
    } = this

    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          leftIcon="chevron-left"
          title={
            navigationState.params && navigationState.params.goal
              ? 'Update Project'
              : 'New Project'
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
          placeholder="Project Name"
          onChangeText={this.handleGoalTitleChange}
        />
        <ProjectProperties
          financials={financials}
          tasks={tasks}
          onFinancialsChange={handleFinancialsChange}
          onTasksChange={handleTasksChange}
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
              marginTop: 20,
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
