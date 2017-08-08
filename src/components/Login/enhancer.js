import { compose } from 'ramda'

// import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import state from './state'
import handlers from './handlers'

export default compose(firebaseConnect(), state, handlers)
