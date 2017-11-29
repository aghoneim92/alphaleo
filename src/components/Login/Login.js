import React, { PureComponent } from 'react'

import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'apsl-react-native-button'

import Logo from '../Logo'
import { COLOR_PRIMARY_DARK } from '../../constants'
import enhance from './enhancer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY_DARK,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    flex: 1,
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  input: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    height: 40,
    padding: 5,
    borderRadius: 5,
    width: '100%',
  },
  passwordInput: {
    marginTop: 10,
  },
  loginButtonWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  loginButton: {
    borderColor: 'white',
    width: '35%',
    height: 35,
  },
  text: {
    color: 'white',
  },
  or: {
    fontSize: 16,
  },
  facebookButton: {
    borderColor: 'white',
    width: '100%',
    height: 40,
    marginTop: 15,
  },
  facebookIcon: {
    marginLeft: 20,
  },
})

// TODO: match status bar color
// TODO: validate inputs
@enhance
export default class Login extends PureComponent {
  emailRef = null
  passwordRef = null

  handleEmailRef = ref => {
    this.emailRef = ref
  }

  handlePasswordRef = ref => {
    this.passwordRef = ref
  }

  handleEmailSubmit = () => {
    const { passwordRef } = this

    if (passwordRef) {
      passwordRef.focus()
    }
  }

  validate = () => {
    const { props: { email, password }, emailRef, passwordRef } = this

    if (!email) {
      emailRef.focus()

      return false
    }

    if (!password) {
      passwordRef.focus()

      return false
    }

    return true
  }

  // TODO: better validation
  handleSubmit = () => {
    if (this.validate()) {
      this.props.loginWithEmail()
    }
  }

  handleLoginPress = () => {
    if (this.validate()) {
      Keyboard.dismiss()
      this.props.loginWithEmail()
    }
  }

  render() {
    const {
      props: {
        email,
        setEmail,
        password,
        setPassword,
        onLoginWithFacebookPress,
        signingIn,
        errorText,
      },
      handleEmailRef,
      handlePasswordRef,
      handleEmailSubmit,
      handleSubmit,
      handleLoginPress,
    } = this

    return (
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.logoWrapper}>
          <Logo />
        </View>
        <View style={styles.actions}>
          <TextInput
            ref={handleEmailRef}
            placeholder="Email"
            placeholderTextColor="lightgrey"
            keyboardType="email-address"
            maxLength={100}
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            style={styles.input}
            onSubmitEditing={handleEmailSubmit}
          />
          <TextInput
            ref={handlePasswordRef}
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="lightgrey"
            maxLength={50}
            returnKeyType="send"
            secureTextEntry
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
          />
          <View style={styles.loginButtonWrapper}>
            <Button
              style={styles.loginButton}
              textStyle={styles.text}
              accessibilityLabel="Press this button to login to the application"
              onPress={handleLoginPress}
              isLoading={signingIn}
            >
              Login
            </Button>
          </View>
          <Text style={styles.text}>{errorText}</Text>
          <Text style={[styles.text, styles.or]}>- or -</Text>
          <Button
            onPress={onLoginWithFacebookPress}
            style={styles.facebookButton}
            textStyle={styles.text}
          >
            <Icon
              name="facebook-official"
              size={32}
              color="white"
              style={styles.facebookIcon}
            />
            Login with Facebook
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
