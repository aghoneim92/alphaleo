// @flow
import React from 'react'

import enhancer from './enhancer'

const AppContainer = ({ Child }) => <Child />

export default enhancer(AppContainer)
