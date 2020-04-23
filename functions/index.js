const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore
  .document('events/{eventId}')
  .onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    const activity = {
      type: 'newEvent',
      eventDate: newEvent.date,
      hostedBy: newEvent.hostedBy,
      title: newEvent.title,
      photoURL: newEvent.hostPhotoURL,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      hostUid: newEvent.hostUid,
      eventId: event.id
    };

    // There can't be any undefined objects
    console.log(activity);

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created, id: ', docRef.id);
      })
      .catch(err => {
        return console.log(err);
      });
  });
