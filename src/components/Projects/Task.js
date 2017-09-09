import React from 'react'
import { View, Text } from 'react-native'
import CheckedDone from './CheckedDone'

const Task = ({ task, onPress }) =>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      width: '90%',
      overflow: 'visible',
      position: 'relative',
      padding: 10,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 5,
      marginLeft: '5%',
      marginTop: 20,
    }}
  >
    <Text
      style={{
        fontSize: 20,
      }}
    >
      {task.get('value')}
    </Text>
    <CheckedDone onPress={onPress} checked={task.get('completed')} />
  </View>

export default Task
