import React from 'react'
import { Provider } from 'react-redux'
import { View, StatusBar } from 'react-native'

import { COLOR_PRIMARY_DARK } from '../constants'

// import { themeManager } from 'nachos-ui'

import store from '../redux/store'

import AppContainer from './AppContainer/AppContainer'

// const buttonTheme = themeManager.getStyle('Button')

// const newButtonTheme = {
//   ...buttonTheme,
//   BUTTON_ROUNDED_RADIUS: 10,
//   BUTTON_ROUNDED_HEIGHT: 40,
// }

// themeManager.setSource('Button', () => newButtonTheme)

const App = () =>
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor={COLOR_PRIMARY_DARK} />
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </View>

export default App
