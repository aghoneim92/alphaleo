// @flow

import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { withPropsOnChange } from 'recompose'

import { compose, toPairs } from 'ramda'
import moment from 'moment'

import Header from '../Header'

import NewMessage from './NewMessage'

// TODO: discuss messaging system (sender(s), etc)

// TODO: limit title length
// TODO: limit message length
type Announcement = {
  title: string,
  content: string,
  time: number,
}

type MessagesProps = {
  announcements: { [id: string]: Announcement },
  onNewMessagePress: Function,
  onDrawerTogglePress: Function,
}

const messageComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  topRow: { flex: 1, flexDirection: 'row' },
  title: { flex: 5, fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, marginTop: 20, fontSize: 15 },
})

// TODO: truncate long messages and navigate to a new page when pressed
// TODO: simpler timestamps for today, yesterday?
const MessageComponent = ({ title, content, time }: Announcement) => (
  <View style={messageComponentStyles.container}>
    <View style={messageComponentStyles.topRow}>
      <Text style={messageComponentStyles.title}>{title}</Text>
      <Text style={{ flex: 1, fontSize: 10 }}>
        {moment(time).format('DD-MM-YY hh:mm a')}
      </Text>
    </View>
    <Text style={messageComponentStyles.content}>{content}</Text>
  </View>
)

const handlers = withPropsOnChange(['navigation'], ({ navigation }) => ({
  onNewMessagePress: () => navigation.navigate('NewMessage'),
  onDrawerTogglePress: () => navigation.navigate('DrawerToggle'),
}))

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: 'lightgrey' },
  scrollViewContent: { flex: 1, marginBottom: 10 },
})

// TODO: use flatlist, limit to last, reload on more..
// TODO: show no messages screen
// TODO: allow refresh
// TODO: animate new messages
const Messages = ({
  announcements,
  onNewMessagePress,
  onDrawerTogglePress,
}: MessagesProps) => (
  <View style={{ flex: 1 }}>
    <Header
      title="Announcements"
      leftIcon="bars"
      rightIcon="plus"
      onLeftIconPress={onDrawerTogglePress}
      onRightIconPress={onNewMessagePress}
    />
    <ScrollView style={styles.scrollView}>
      <View style={styles.scrollViewContent}>
        {toPairs(announcements)
          .sort(([, a], [, b]) => b.time - a.time)
          .map(([id, announcement]) => (
            <MessageComponent key={id} {...announcement} />
          ))}
      </View>
    </ScrollView>
  </View>
)

// TODO: dynamic limitToLast
const enhance = compose(
  firebaseConnect([
    { path: 'announcements', queryParams: ['orderByChild=time'] },
  ]),
  connect(({ firebase: { data: { announcements } } }) => ({
    announcements,
  })),
  handlers,
)

const Navigator = StackNavigator(
  {
    Home: {
      screen: enhance(Messages),
    },
    NewMessage: {
      screen: NewMessage,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
)

// TODO: query
export default Navigator
