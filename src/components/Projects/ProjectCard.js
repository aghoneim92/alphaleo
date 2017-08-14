import { StyleSheet, TouchableOpacity } from 'react-native'

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
} from 'react-native-material-cards'

import moment from 'moment'

const ProjectCard = project => {
  const {
    id,
    title,
    type,
    achieved,
    target,
    deadline,
    firebase,
    navigation,
  } = project

  const formattedDeadline = moment(deadline).format('DD-MM-YY')

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NewGoal', {
          goal: {
            id,
            title,
            type,
            achieved,
            target,
            deadline: formattedDeadline,
          },
        })}
    >
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcon
            backgroundColor="transparent"
            size={40}
            iconStyle={{ color: 'black' }}
            name="attach-money"
          />
          <CardTitle title={title} />
        </View>
        <CardContent>
          <Text>
            {`Target: LE ${target}, Achieved: LE ${achieved}, Deadline: ${formattedDeadline}`}
          </Text>
          <View
            style={{
              margin: 20,
              marginLeft: 40,
            }}
          >
            <ProgressBarClassic
              progress={target === 0 ? 0 : 100 * achieved / target}
              valueStyle="balloon"
            />
          </View>
        </CardContent>
        <CardAction seperator inColumn={false}>
          <CardButton
            onPress={() => {
              firebase.ref(`goals/${id}`).remove()
            }}
            title="Delete"
            color="blue"
          />
        </CardAction>
      </Card>
    </TouchableOpacity>
  )
}
