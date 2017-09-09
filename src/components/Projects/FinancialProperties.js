// @flow
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker'
import ProgressIndicator from 'react-native-progress-indicator'

import {
  compose,
  withPropsOnChange,
  setDisplayName,
  withHandlers,
} from 'recompose'
import moment from 'moment'

export type Financials = {
  target: number,
  achieved: number,
  deadline: number,
}

const DATE_FORMAT = 'DD-MM-YYYY'

const moneyInputOptions = {
  unit: 'LE ',
  separator: '.',
  delimiter: ',',
}

const minDate = moment().format(DATE_FORMAT)

const styles = StyleSheet.create({
  dumbWrapper: { flex: 1 },
  moneyInputTitle: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  moneyInput: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  datePickerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
})

const datePickerStyle = {
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
}

const updateFinancials = key => props => value => {
  const floatValue = parseFloat(value.replace(/(\s*LE\s*)|,/g, ''))
  props.onFinancialsChange(props.financials.set(key, floatValue))
}
const handlers = withHandlers({
  onTargetChange: updateFinancials('target'),
  onAchievedChange: updateFinancials('achieved'),
  onDeadlineChange: props => deadline =>
    props.onFinancialsChange(props.financials.set('deadline', deadline)),
})

const financialsMapper = withPropsOnChange(['financials'], ({ financials }) =>
  financials.toJS(),
)
const deadlineMapper = withPropsOnChange(['deadline'], ({ deadline }) => ({
  deadline: moment(deadline).format(DATE_FORMAT),
}))

const addLE = key => props => ({
  [key]: `LE ${props[key].toFixed(2)}`,
})
const targetMapper = withPropsOnChange(['target'], addLE('target'))
const achievedMapper = withPropsOnChange(['achieved'], addLE('achieved'))
const percDeriver = withPropsOnChange(
  ['target', 'achieved'],
  ({ target, achieved }) => ({
    ratio: target === 0 ? 0 : achieved / target,
  }),
)

const enhancer = compose(
  setDisplayName('FinancialProperties'),
  handlers,
  financialsMapper,
  deadlineMapper,
  percDeriver,
  targetMapper,
  achievedMapper,
)

type OnNumberChange = number => void

type FinancialPropertiesProps = {
  target: number,
  achieved: number,
  onTargetChange: OnNumberChange,
  onAchievedChange: OnNumberChange,
  onDeadlineChange: OnNumberChange,
}

const FinancialProperties = ({
  target,
  achieved,
  ratio,
  deadline,
  onTargetChange,
  onAchievedChange,
  onDeadlineChange,
}: FinancialPropertiesProps) =>
  <View style={styles.dumbWrapper}>
    <Text style={styles.moneyInputTitle}>Target</Text>
    <TextInputMask
      style={styles.moneyInput}
      value={target}
      type="money"
      options={moneyInputOptions}
      onChangeText={onTargetChange}
    />
    <Text style={styles.moneyInputTitle}>Achieved</Text>
    <TextInputMask
      style={styles.moneyInput}
      value={achieved}
      type="money"
      options={moneyInputOptions}
      onChangeText={onAchievedChange}
    />
    <ProgressIndicator
      style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}
      progress={ratio}
    />
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Text style={{ fontSize: 15, marginTop: 10 }}>
        {ratio * 100}%
      </Text>
    </View>
    <Text style={styles.moneyInputTitle}>Deadline</Text>
    <View style={styles.datePickerWrapper}>
      <DatePicker
        style={{ flex: 1 }}
        date={deadline}
        mode="date"
        placeholder="select date"
        format={DATE_FORMAT}
        minDate={minDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={datePickerStyle}
        onDeadlineChange={onDeadlineChange}
      />
    </View>
  </View>

export default enhancer(FinancialProperties)
