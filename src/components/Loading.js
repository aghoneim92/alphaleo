import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import { COLOR_PRIMARY_DARK } from '../constants'
import Logo from './Logo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY_DARK,
  },
})

const Loading = () => (
  <View style={styles.container}>
    <View style={{ paddingTop: Platform.OS === 'ios' ? 20 : 0 }}>
      <Logo />
    </View>
  </View>
)

export default Loading
