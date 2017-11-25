const functions = require('firebase-functions')
const { keys, values, flatten } = require('ramda')

const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.notifyAnnouncement = functions.database
  .ref('/announcements/{announcementId}')
  .onCreate(event => {
    const { title, content } = event.data.val()
    const { announcementId } = event.params

    const payload = {
      notification: {
        title,
        body: content,
        // icon
      },
      data: {
        announcementId,
      },
    }

    return admin
      .database()
      .ref('/tokens')
      .once('value')
      .then(tokensSnapshot => {
        if (!tokensSnapshot.hasChildren()) {
          return Promise.resolve()
        }

        const tokensMap = tokensSnapshot.val()
        const tokens = flatten(values(tokensMap).map(keys))

        console.log('tokens:', tokens)

        return admin
          .messaging()
          .sendToDevice(tokens, payload)
          .then(response => {
            response.results.forEach((result, index) => {
              const error = result.error
              if (error) {
                console.error(
                  'Failure sending notification to',
                  tokens[index],
                  error
                )
              }
            })
          })
      })
  })
