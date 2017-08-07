import { compose } from 'ramda'

import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { mapProps } from 'recompose'

import Loading from '../Loading'
import Login from '../Login'
import Main from '../Main'

type AuthType = { isLoaded: boolean, isEmpty: boolean }

export const mapStateToProps = ({
  firebase: { auth },
}: {
  firebase: { auth: AuthType },
}) => ({
  auth,
})

export const propsMapper = ({
  auth: { isLoaded, isEmpty },
}: {
  auth: AuthType,
}) => {
  let Child

  if (!isLoaded) {
    Child = Loading
  } else if (isEmpty) {
    Child = Login
  } else {
    Child = Main
  }

  return { Child }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
  mapProps(propsMapper),
)
