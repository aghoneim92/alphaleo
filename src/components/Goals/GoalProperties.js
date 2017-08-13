import React, { Component } from 'react'

import { View, TextInput, Text } from 'react-native'

import { TextInputMask } from 'react-native-masked-text'

import ProgressBarClassic from 'react-native-progress-bar-classic'

import DatePicker from 'react-native-datepicker'

import moment from 'moment'

class FinancialProperties extends Component {
  state = {
    target: 'LE 0.00',
    achieved: 'LE 0.00',
  }
  handleAchievedRef = ref => {
    this.achievedRef = ref
  }

  handleAchivedChange = (achieved: string) => {
    this.setState({ achieved })
    this.props.onAchievedChange(this.achievedRef.getRawValue())
  }

  handleTargetChange = (target: string) => {
    this.setState({ target })
    this.props.onTargetChange(this.targetRef.getRawValue())
  }

  handleTargetRef = ref => {
    this.targetRef = ref
  }

  render() {
    const {
      props: {
        target: rawTarget,
        achieved: rawAchieved,
        deadline,
        onDateChange,
      },
      state: { target, achieved },
    } = this

    const perc = rawTarget === 0 ? 0 : 100 * rawAchieved / rawTarget

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
          onChangeText={this.handleTargetChange}
          ref={this.handleTargetRef}
        />
        <View style={{ marginTop: 20, padding: 10 }}>
          <Text style={{ fontSize: 20 }}>Achieved</Text>
        </View>
        <TextInputMask
          ref={this.handleAchievedRef}
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
          onChangeText={this.handleAchivedChange}
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
}
const GoalProperties = ({ goalType, ...props }) =>
  goalType === 'financial'
    ? <FinancialProperties {...props} />
    : <View {...props} />

export default GoalProperties
