// @flow
import React from 'react'
import { View } from 'react-native'

import type { Map } from 'immutable'
import {
  compose,
  pure,
  withHandlers,
  withState,
  setDisplayName,
} from 'recompose'

import TabChooser from './TabChooser'
import FinancialProperties from './FinancialProperties'
import Tasks from './Tasks'

type ProjectPropertiesPropTypes = {
  financials: Map,
  onFinancialsChange: (financials: Map) => void,
  tasks: Map,
  onTasksChange: (tasks: Map) => void,
}

const handlers = withHandlers({
  onFinancialPress: props => () => props.setCurrentTab('financial'),
  onTaskPress: props => () => props.setCurrentTab('tasks'),
})
const state = withState('currentTab', 'setCurrentTab', 'financial')

const enhancer = compose(
  setDisplayName('ProjectProperties'),
  state,
  handlers,
  pure,
)

const ProjectProperties = ({
  financials,
  onFinancialsChange,
  currentTab,
  onFinancialPress,
  onTaskPress,
  tasks,
  onTasksChange,
}: ProjectPropertiesPropTypes) =>
  <View style={{ flex: 1 }}>
    <TabChooser
      currentTab={currentTab}
      onFinancialPress={onFinancialPress}
      onTaskPress={onTaskPress}
    />
    {currentTab === 'financial'
      ? <FinancialProperties
          financials={financials}
          onFinancialsChange={onFinancialsChange}
        />
      : <Tasks tasks={tasks} onTasksChange={onTasksChange} />}
  </View>

export default enhancer(ProjectProperties)
