// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { View } from 'react-native'

import store from '../redux/store'

import AppContainer from './AppContainer/AppContainer'

const App = () => (
  <View style={{ flex: 1 }}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </View>
)

export default App
