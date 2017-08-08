import { compose } from 'ramda'

import state from './state'
import handlers from './handlers'

export default compose(state, handlers)
