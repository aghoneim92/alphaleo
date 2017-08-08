import { withState } from 'recompose'
import { compose, identity, map, reduce, toPairs } from 'ramda'
import capitalize from 'capitalize'

export default compose(
  reduce(compose, identity),
  map(([key, item]) => withState(key, `set${capitalize(key)}`, item)),
  toPairs,
)
