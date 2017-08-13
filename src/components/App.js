import React from 'react'
import { Provider } from 'react-redux'
import { View, StatusBar } from 'react-native'

import { COLOR_PRIMARY_DARK } from '../constants'

import store from '../redux/store'

import AppContainer from './AppContainer/AppContainer'

const App = () =>
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor={COLOR_PRIMARY_DARK} />
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </View>

export default App
