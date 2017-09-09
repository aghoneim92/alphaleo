import React from 'react'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Text, View } from 'react-native'

import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from '../../constants'

const styles = {
  buttonWrapper: {
    borderWidth: 1,
    borderColor: COLOR_PRIMARY_DARK,
    flex: 1,
  },
  goalTypeWrapper: {
    padding: 10,
  },
  goalTypeText: { fontSize: 20 },
  goalSwitchWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}

const TabChooser = ({ currentTab, onFinancialPress, onTaskPress }) =>
  <View style={styles.goalTypeWrapper}>
    <View style={styles.goalSwitchWrapper}>
      <View style={{ ...styles.buttonWrapper, borderRightWidth: 0 }}>
        <MaterialIcon.Button
          borderRadius={0}
          onPress={onFinancialPress}
          backgroundColor={
            currentTab === 'financial' ? COLOR_PRIMARY : 'transparent'
          }
          iconStyle={{
            color: currentTab === 'financial' ? 'white' : 'black',
          }}
          name="attach-money"
        >
          <Text
            style={{
              fontSize: 15,
              color: currentTab === 'financial' ? 'white' : 'black',
            }}
          >
            Fundraising
          </Text>
        </MaterialIcon.Button>
      </View>
      <View style={styles.buttonWrapper}>
        <FontAwesome.Button
          borderRadius={0}
          onPress={onTaskPress}
          backgroundColor={
            currentTab === 'tasks' ? COLOR_PRIMARY : 'transparent'
          }
          iconStyle={{ color: currentTab === 'tasks' ? 'white' : 'black' }}
          name="tasks"
        >
          <Text
            style={{
              fontSize: 15,
              color: currentTab === 'tasks' ? 'white' : 'black',
            }}
          >
            Tasks
          </Text>
        </FontAwesome.Button>
      </View>
    </View>
  </View>

export default TabChooser
