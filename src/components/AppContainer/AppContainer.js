// @flow
import React from 'react'
import { Platform, View } from 'react-native'

import enhancer from './enhancer'
import { COLOR_PRIMARY_DARK } from '../../constants'

const AppContainer = ({ Child }) => (
  <View style={{ flex: 1, backgroundColor: COLOR_PRIMARY_DARK }}>
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PRIMARY_DARK,
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 20 : 0,
        }}
      >
        <Child />
      </View>
    </View>
  </View>
)

export default enhancer(AppContainer)
