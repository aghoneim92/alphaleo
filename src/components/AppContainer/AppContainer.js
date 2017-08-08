// @flow
import React, { Component } from 'react'

import { View, LayoutAnimation, Keyboard } from 'react-native'

import enhancer from './enhancer'

export class EnhancedAppContainer extends Component {
  state = {
    keyboardHeight: 0,
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.handleKeyboardHeightChange,
    )
    this.keyboardHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.handleKeyboardHeightChange,
    )
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove()
    this.keyboardHideListener.remove()
  }

  keyboardShowListener: { remove: Function }
  keyboardHideListener: { remove: Function }

  handleKeyboardHeightChange = ({
    endCoordinates: { height },
  }: {
    // eslint-disable-next-line react/no-unused-prop-types
    endCoordinates: { height: number },
  }) => {
    LayoutAnimation.easeInEaseOut()
    this.setState({ keyboardHeight: height })
  }

  render() {
    const { Child } = this.props
    const { keyboardHeight } = this.state

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#710007',
          transform: [{ translateY: -keyboardHeight }],
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 20 }}>
          <Child />
        </View>
      </View>
    )
  }
}

export default enhancer(EnhancedAppContainer)
