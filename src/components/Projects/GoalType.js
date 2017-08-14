import React from 'react'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Text, View, TextInput } from 'react-native'

import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from '../../constants'

const styles = {
  buttonWrapper: {
    borderWidth: 1,
    borderColor: COLOR_PRIMARY_DARK,
    flex: 1,
  },
  goalTypeWrapper: {
    marginTop: 20,
    padding: 10,
  },
  goalTypeTextWrapper: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  goalTypeText: { fontSize: 20 },
  goalSwitchWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}

const GoalType = ({ type, onFinancialPress, onTaskPress }) =>
  <View style={styles.goalTypeWrapper}>
    <View style={styles.goalTypeTextWrapper}>
      <Text style={styles.goalTypeText}>Goal Type</Text>
    </View>
    <View style={styles.goalSwitchWrapper}>
      <View style={{ ...styles.buttonWrapper, borderRightWidth: 0 }}>
        <MaterialIcon.Button
          borderRadius={0}
          onPress={onFinancialPress}
          backgroundColor={type === 'financial' ? COLOR_PRIMARY : 'transparent'}
          iconStyle={{
            color: type === 'financial' ? 'white' : 'black',
          }}
          name="attach-money"
        >
          <Text
            style={{
              fontSize: 15,
              color: type === 'financial' ? 'white' : 'black',
            }}
          >
            Financial
          </Text>
        </MaterialIcon.Button>
      </View>
      <View style={styles.buttonWrapper}>
        <FontAwesome.Button
          borderRadius={0}
          onPress={onTaskPress}
          backgroundColor={type === 'task' ? COLOR_PRIMARY : 'transparent'}
          iconStyle={{ color: type === 'task' ? 'white' : 'black' }}
          name="tasks"
        >
          <Text
            style={{
              fontSize: 15,
              color: type === 'task' ? 'white' : 'black',
            }}
          >
            Task
          </Text>
        </FontAwesome.Button>
      </View>
    </View>
  </View>

export default GoalType
