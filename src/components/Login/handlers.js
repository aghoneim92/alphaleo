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

    // try {
    //   await firebase.auth().signInWithEmailAndPassword(email, password)
    // } catch (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code
    //   var errorMessage = error.message

    //   setErrorText(errorMessage)
    // }
  },
  onLoginWithFacebookPress: props => async () => {
    try {
      const result = LoginManager.logInWithReadPermissions([
        'public_profile',
        'email',
      ])

      if (!result.isCanceled) {
        const { accessToken } = await AccessToken.getCurrentAccessToken()

        const fbProvider = props.firebase.auth.FacebookAuthProvider.credential(
          accessToken,
        )

        console.log('fbProvider')
        props.firebase.auth().signInWithCredential(fbProvider)

        // alert(user)
      } else {
        // alert('canceled')
      }
    } catch (e) {
      // alert(`error ${e}`)
    }
    // const {
    //   token,
    // } = await Expo.Facebook.logInWithReadPermissionsAsync('614051825453607', {
    //   permissions: ['email', 'public_profile'],
    // })
    // const credential = firebase.auth.FacebookAuthProvider.credential(token)
    // try {
    //   await firebase.auth().signInWithCredential(credential)
    // } catch (error) {
    //   let errorCode = error.code
    //   let errorMessage = error.message
    //   setErrorText(errorMessage)
    // }
  },
})
