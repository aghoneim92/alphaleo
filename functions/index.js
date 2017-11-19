/* eslint-disable */
const functions = require('firebase-functions')

const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.notifyAnnouncement = functions.database
  .ref('/announcements/{announcementId}')
  .onCreate(event => {
    const { title, content } = event.data.val()
    const { announcementId } = event.params

    return admin
      .database()
      .ref('/tokens')
      .once('value')
      .then(tokensSnapshot => {
        if (!tokensSnapshot.hasChildren()) {
          return Promise.resolve()
        }

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

        const tokensMap = tokensSnapshot.val()
        const tokens = Object.keys(tokensMap).map(uid => tokensMap[uid])

        return admin
          .messaging()
          .sendToDevice(tokens, payload)
          .then(response => {
            const tokensToRemove = []
            response.results.forEach((result, index) => {
              const error = result.error
              if (error) {
                console.error(
                  'Failure sending notification to',
                  tokens[index],
                  error
                )
                // Cleanup the tokens who are not registered anymore.
                if (
                  error.code === 'messaging/invalid-registration-token' ||
                  error.code === 'messaging/registration-token-not-registered'
                ) {
                  tokensToRemove.push(
                    tokensSnapshot.ref.child(tokens[index]).remove()
                  )
                }
              }
            })
            return Promise.all(tokensToRemove)
          })
      })
  })
