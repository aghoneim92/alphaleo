import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { firebaseConnect } from 'react-redux-firebase'

import {
  compose,
  withHandlers,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose'

import Header from '../Header'

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  content: {
    fontSize: 15,
    padding: 5,
    paddingTop: 10,
    flex: 1,
    textAlignVertical: 'top',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
})

// TODO: error handling
const handlers = withHandlers({
  onSendPress: ({ firebase, title, content, navigation }) => () => {
    firebase
      .push('announcements', {
        title: title.trim(),
        content: content.trim(),
        time: Date.now(),
      })
      .then(() => navigation.goBack())
  },
})

const stateHandlers = withStateHandlers(
  {
    title: '',
    content: '',
  },
  {
    onTitleChange: () => title => ({ title }),
    onContentChange: () => content => ({ content }),
  },
)

const createOnBackPress = withPropsOnChange(
  ['navigation'],
  ({ navigation }) => ({
    onBackPress: () => navigation.goBack(),
  }),
)

const NewMessage = ({
  onBackPress,
  onSendPress,
  title,
  content,
  onTitleChange,
  onContentChange,
}) => (
  <View style={{ flex: 1 }}>
    <Header
      title="New Announcement"
      leftIcon="chevron-left"
      rightIcon="send-o"
      onLeftIconPress={onBackPress}
      onRightIconPress={onSendPress}
    />
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <TextInput
        style={styles.title}
        value={title}
        placeholder="Enter a Title"
        underlineColorAndroid="transparent"
        returnKeyType="next"
        onChangeText={onTitleChange}
        autoFocus
      />
      <View style={styles.separator} />
      <TextInput
        style={styles.content}
        value={content}
        multiline
        placeholder="Enter your Message"
        underlineColorAndroid="transparent"
        onChangeText={onContentChange}
      />
    </View>
  </View>
)

const enhancer = compose(
  firebaseConnect(),
  stateHandlers,
  handlers,
  createOnBackPress,
)

export default enhancer(NewMessage)
