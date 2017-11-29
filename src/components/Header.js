import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { COLOR_PRIMARY } from '../constants'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: COLOR_PRIMARY,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  leftIconWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftIconStyle: {
    marginLeft: 10,
  },
  textWrapper: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  rightIconWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})

// TODO: choose pressDown color other than black
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
}) => (
  <View style={styles.header}>
    <View style={styles.leftIconWrapper}>
      {leftIcon && (
        <Icon.Button
          onPress={onLeftIconPress}
          iconStyle={styles.leftIconStyle}
          backgroundColor="transparent"
          name={leftIcon}
          size={24}
          color="white"
        />
      )}
    </View>
    <View style={styles.textWrapper}>
      <Text style={styles.text}>{title}</Text>
    </View>
    <View style={styles.rightIconWrapper}>
      {rightIcon && (
        <Icon.Button
          onPress={onRightIconPress}
          backgroundColor="transparent"
          size={16}
          name={rightIcon}
        />
      )}
    </View>
  </View>
)

export default Header
