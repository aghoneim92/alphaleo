import { withHandlers } from 'recompose'

// import * as firebase from 'firebase'

// import Expo from 'expo'

import * as FBSDK from 'react-native-fbsdk'

const { AccessToken, LoginManager } = FBSDK

export default withHandlers({
  onLoginWithEmailPress: props => async () => {
    const { email, password, setErrorText, setSigningIn } = props

    setSigningIn(true)
    setErrorText(false)
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
