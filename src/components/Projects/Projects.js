// @flow
import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'

import { StackNavigator } from 'react-navigation'

import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

import { toPairs } from 'ramda'

import ProjectCard from './ProjectCard'
import ProjectEditor from './ProjectEditor'
import Header from './Header'

@firebaseConnect(['projects'])
@connect(({ firebase: { data: { projects } } }) => ({
  projects,
}))
class Projects extends Component {
  handleAddPress = () => {
    this.props.navigation.navigate('ProjectEditor')
  }

  render() {
    const { firebase, navigation, projects = {} } = this.props

    const projectComponents = toPairs(projects).map(([key, project]) =>
      <ProjectCard
        key={key}
        project={{ id: key, ...project }}
        firebase={firebase}
        navigation={navigation}
      />,
    )

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftIcon="bars"
          rightIcon="plus"
          title="Projects"
          onRightIconPress={this.handleAddPress}
        />
        <ScrollView style={{ flex: 1 }}>
          {projectComponents}
        </ScrollView>
      </View>
    )
  }
}

export default StackNavigator(
  {
    Projects: {
      screen: Projects,
    },
    ProjectEditor: {
      screen: ProjectEditor,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
)
