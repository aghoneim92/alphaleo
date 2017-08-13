// @flow
import React, { Component } from 'react'

import { Platform, View, LayoutAnimation, Keyboard } from 'react-native'

import enhancer from './enhancer'

export class EnhancedAppContainer extends Component {
  state = {
    keyboardHeight: 0,
  }

  componentDidMount() {
    this.keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardHeightChange,
    )
    this.keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardHeightChange,
    )
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove()
    this.keyboardHideListener.remove()
  }

  keyboardShowListener: { remove: Function }
  keyboardHideListener: { remove: Function }

  handleKeyboardHeightChange = event => {
    const height = event ? event.endCoordinates.height : 0

    this.setState({ keyboardHeight: height })
  }

  render() {
    const { Child } = this.props
    const { keyboardHeight } = this.state

    console.log('keyboardHeight', keyboardHeight)

    return (
      <View style={{ flex: 1, backgroundColor: '#710007' }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#710007',
            transform: [
              {
                translateY:
                  -keyboardHeight +
                  (Platform.OS === 'android' && keyboardHeight ? 10 : 0),
              },
            ],
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginTop: Platform.OS === 'ios' ? 20 : 0,
            }}
          >
            <Child />
          </View>
        </View>
      </View>
    )
  }
}

export default enhancer(EnhancedAppContainer)
