// @flow

import React, { PureComponent } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { compose, toPairs } from 'ramda'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { withHandlers } from 'recompose'
import moment from 'moment'

import Header from '../Header'

// TODO: discuss messaging system (sender(s), etc)

// TODO: limit title length
// TODO: limit message length
type Message = {
  title: string,
  content: string,
  time: number,
}

type MessagesProps = {
  messages: { [id: string]: Message },
  onNewMessagePress: Function,
}

// TODO: truncate long messages and navigate to a new page when pressed
// TODO: simpler timestamps for today, yesterday?
const MessageComponent = ({ title, content, time = 1507179477113 }: Message) =>
  <View
    style={{ flex: 1, padding: 20, marginBottom: 10, backgroundColor: 'white' }}
  >
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ flex: 5, fontSize: 20, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text style={{ flex: 1, fontSize: 10 }}>
        {moment(time).format('DD-MM-YY hh:mm a')}
      </Text>
    </View>
    <Text style={{ flex: 1, marginTop: 20, fontSize: 15 }}>
      {content}
    </Text>
  </View>

// TODO: use flatlist, limit to last, reload on more..
// TODO: show no messages screen
// TODO: allow refresh
// TODO: animate new messages
const Messages = ({ messages, onNewMessagePress }: MessagesProps) =>
  <View style={{ flex: 1 }}>
    <Header
      title="Messages"
      rightIcon="plus"
      onRightIconPress={onNewMessagePress}
    />
    <ScrollView style={{ flex: 1, backgroundColor: 'lightgrey' }}>
      {toPairs(messages)
        .sort(([, a], [, b]) => b.time - a.time)
        .map(([id, message]) => <MessageComponent key={id} {...message} />)}
    </ScrollView>
  </View>

const enhance = compose(
  firebaseConnect([{ path: 'messages', queryParams: ['orderByChild=time'] }]),
  connect(({ firebase: { data: { messages } } }) => ({
    messages,
  })),
)

// TODO: query
export default enhance(Messages)
