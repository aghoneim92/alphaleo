/* @flow */
import createState from '../../lib/createState'

export default createState({
  signingIn: false,
  loginSuccess: false,
  email: '',
  password: '',
  errorText: false,
})
