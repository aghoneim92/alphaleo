import { withHandlers } from 'recompose'

// import * as firebase from 'firebase'

// import Expo from 'expo'

import * as FBSDK from 'react-native-fbsdk'

const { AccessToken, LoginManager } = FBSDK

export default withHandlers({
  loginWithEmail: props => async () => {
    const { email, password, setErrorText, setSigningIn } = props

    setSigningIn(true)
    setErrorText(false)

    try {
      await props.firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      // TODO: clear error messages
      setErrorText(e.toString())
    } finally {
      setSigningIn(false)
    }
  },
  onLoginWithFacebookPress: props => async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
      ])

      if (!result.isCanceled) {
        const { accessToken } = await AccessToken.getCurrentAccessToken()

        const fbProvider = props.firebase.auth.FacebookAuthProvider.credential(
          accessToken,
        )

        props.firebase.auth().signInWithCredential(fbProvider)
      }
    } catch (e) {}
  },
})
