import React from 'react'

import { View, TextInput, Text } from 'react-native'

import { TextInputMask } from 'react-native-masked-text'

import ProgressBarClassic from 'react-native-progress-bar-classic'

import DatePicker from 'react-native-datepicker'

import moment from 'moment'

const FinancialProperties = ({
  achieved,
  onAchievedChange,
  target,
  onTargetChange,
  deadline,
  onDateChange,
}) => {
  const rawTarget = target.replace('LE ', '')
  const rawAchieved = achieved.replace('LE ', '')

  const perc =
    parseFloat(rawTarget) === 0
      ? 0
      : 100 * parseFloat(rawAchieved) / parseFloat(rawTarget)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20, padding: 10 }}>
        <Text style={{ fontSize: 20 }}>Target</Text>
      </View>
      <TextInputMask
        style={{
          fontSize: 20,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
        }}
        value={target}
        type="money"
        options={{
          unit: 'LE ',
          separator: '.',
          delimiter: ',',
        }}
        onChangeText={onTargetChange}
      />
      <View style={{ marginTop: 20, padding: 10 }}>
        <Text style={{ fontSize: 20 }}>Achieved</Text>
      </View>
      <TextInputMask
        style={{
          fontSize: 20,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
        }}
        value={achieved}
        type="money"
        options={{
          unit: 'LE ',
          separator: '.',
          delimiter: ',',
        }}
        onChangeText={onAchievedChange}
      />
      <View
        style={{
          margin: 20,
          marginLeft: 40,
        }}
      >
        <ProgressBarClassic progress={perc} valueStyle="balloon" />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 20 }}>Deadline</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 20,
        }}
      >
        <DatePicker
          style={{ flex: 1 }}
          date={deadline}
          mode="time"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            dateText: {
              fontSize: 20,
            },
          }}
          onDateChange={onDateChange}
        />
      </View>
    </View>
  )
}
const GoalProperties = ({ goalType, ...props }) =>
  goalType === 'financial'
    ? <FinancialProperties {...props} />
    : <View {...props} />

export default GoalProperties
