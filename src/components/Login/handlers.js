import { withHandlers } from 'recompose'

// import * as firebase from 'firebase'

// import Expo from 'expo'

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
