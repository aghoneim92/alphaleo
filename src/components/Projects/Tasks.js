// @flow
import React from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Map } from 'immutable'

import { withState, pure } from 'recompose'

import Task from './Task'

const state = withState('newTaskValue', 'setNewTaskValue', '')

const Tasks = ({ tasks, onTasksChange, newTaskValue, setNewTaskValue }) =>
  <ScrollView style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={{
          fontSize: 20,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          flex: 1,
        }}
        value={newTaskValue}
        onChangeText={setNewTaskValue}
        underlineColorAndroid="transparent"
        placeholder="New Task"
      />
      <Icon.Button
        onPress={() => {
          onTasksChange(tasks.push(Map({ value: newTaskValue })))
          setNewTaskValue('')
        }}
        color="black"
        backgroundColor="transparent"
        size={16}
        name="plus"
      />
    </View>
    <View>
      {tasks
        .map((task, index) =>
          <Task
            onPress={() =>
              onTasksChange(
                tasks.updateIn([index], task =>
                  task.set('completed', !task.get('completed')),
                ),
              )}
            key={index}
            task={task}
          />,
        )
        .toArray()}
    </View>
  </ScrollView>

export default pure(state(Tasks))
