import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
} from 'react-native-material-cards'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ProgressIndicator from 'react-native-progress-indicator'

import moment from 'moment'
import { Map, fromJS } from 'immutable'

import Task from './Task'
import { COLOR_PRIMARY } from '../../constants'

const ProjectCard = ({
  project: { id, title, financials: { achieved, target, deadline }, tasks },
  firebase,
  navigation,
}) =>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('ProjectEditor', {
        project: {
          id,
          title,
          financials: Map({
            achieved,
            target,
            deadline,
          }),
        },
      })}
    style={{ margin: 10 }}
  >
    <Card>
      <CardContent>
        <CardTitle title={title} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcon
            backgroundColor="transparent"
            size={25}
            color="gray"
            name="attach-money"
          />
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Fundraising</Text>
        </View>
        <ProgressIndicator
          style={{ marginTop: 20 }}
          progress={target === 0 ? 0 : achieved / target}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>{`Achieved: LE ${achieved}`}</Text>
          <Text style={{ fontSize: 15 }}>{`${target === 0
            ? 0
            : achieved * 100 / target}%`}</Text>
          <Text style={{ fontSize: 15 }}>{`Target: LE ${target}`}</Text>
        </View>
        <Text style={{ fontSize: 20, marginTop: 20 }}>
          {`Deadline: ${moment(deadline).format('DD-MM-YYYY')}`}
        </Text>
        <View
          style={{
            height: 0,
            borderColor: COLOR_PRIMARY,
            borderWidth: 1,
            marginTop: 20,
            width: '100%',
          }}
        />
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
        >
          <FontAwesome
            backgroundColor="transparent"
            size={25}
            color="gray"
            name="tasks"
          />
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Tasks</Text>
        </View>
        {tasks.map((task, index) => <Task key={index} task={fromJS(task)} />)}
      </CardContent>
      <CardAction seperator inColumn={false}>
        <CardButton
          onPress={() => {
            // add dialog
            firebase.ref(`projects/${id}`).remove()
          }}
          title="Delete"
          color="blue"
        />
      </CardAction>
    </Card>
  </TouchableOpacity>

export default ProjectCard
