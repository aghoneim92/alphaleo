import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'

import AppContainer from './AppContainer/AppContainer'

const App = () =>
  <Provider store={store}>
    <AppContainer />
  </Provider>

export default App
