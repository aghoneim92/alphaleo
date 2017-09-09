// @flow
import React, { Component } from 'react'
import { Animated, TouchableWithoutFeedback, View } from 'react-native'
import Animation from 'lottie-react-native'

type props = {
  checked: boolean,
}

export default class CheckedDone extends Component<any, props> {
  state = { progress: new Animated.Value(0) }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked) {
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1000,
      }).start()
    } else if (this.props.checked === true) {
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: 0,
      }).start()
    }
  }

  render() {
    return (
      <View style={{ marginLeft: 'auto' }}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <Animation
            style={{ width: 100, height: 100 }}
            source={require('./checked_done.json')}
            progress={this.state.progress}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
