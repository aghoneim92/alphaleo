import React from 'react'

import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import Button from 'apsl-react-native-button'

import enhance from './enhancer'

const styles = {
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#710007',
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
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  onLoginWithEmailPress,
  onLoginWithFacebookPress,
  signingIn,
}) =>
  <View style={styles.login}>
    <View style={{ flex: 1 }}>
      <Image
        style={{ flex: 1 }}
        width={360}
        height={360}
        resizeMode="contain"
        source={{ uri: 'logo_transparent' }}
      />
    </View>
    <View style={styles.actions}>
      <View style={{ ...styles.actions, width: '70%' }}>
        <TextInput
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
        />
        <TextInput
          style={{
            ...styles.input,
            marginTop: 10,
          }}
          placeholder="Password"
          placeholderTextColor="lightgrey"
          maxLength={50}
          returnKeyType="send"
          secureTextEntry
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={setPassword}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{ borderColor: 'white', width: '35%', height: 35 }}
            textStyle={{ color: 'white' }}
            accessibilityLabel="Press this button to login to the application"
            onPress={onLoginWithEmailPress}
            isLoading={signingIn}
          >
            Login
          </Button>
        </View>
        <Text style={{ fontSize: 16, color: 'white' }}>- or -</Text>
        <Button
          onPress={onLoginWithFacebookPress}
          style={{
            borderColor: 'white',
            width: '100%',
            height: 40,
            marginTop: 15,
          }}
          textStyle={{ color: 'white' }}
        >
          <Icon
            name="facebook-official"
            size={32}
            color="white"
            style={{ marginLeft: 50 }}
          />
          Login with Facebook
        </Button>
      </View>
    </View>
  </View>

export default enhance(Login)
