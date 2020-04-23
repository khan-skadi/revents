import firebase from '../../app/common/config/firebase.js';
// import {
//   asyncActionStart,
//   asyncActionFinish,
//   asyncActionError
// } from '../async/asyncActions.js';
// import { fetchSampleData } from '../../app/data/mockApi.js';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers.js';
import { FETCH_EVENTS } from './eventConstants.js';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions.js';

export const createEvent = event => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const userExample = firestore.auth().currentUser; //this is same as using firebase instead of firestore. Firestore is faster.
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newEvent = createNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add('events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success!', 'Event has been created');
      return createdEvent;
    } catch (err) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success!', 'Event has been updated');
    } catch (err) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This will reactive the event, are you sure ?';

  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEventsForDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore(); // firebase API

  const eventsRef = firestore.collection('events');

  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      (await firestore.collection('events').doc(lastEvent.id).get());
    let query;

    lastEvent
      ? (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef.where('date', '>=', today).orderBy('date').limit(2)); // Give me all events in the future

    let querySnapshot = await query.get();

    if (querySnapshot.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnapshot;
    }

    let events = [];

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      let evt = {
        ...querySnapshot.docs[i].data(),
        id: querySnapshot.docs[i].id
      };
      events.push(evt);
    }

    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnapshot; // return the querySnapshot to our component that calls getEventsForDashboard.
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

// export const loadEvents = () => {
//   return async dispatch => {
//     try {
//       dispatch(asyncActionStart());
//       const events = await fetchSampleData();
//       dispatch({ type: FETCH_EVENTS, payload: { events } });
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       console.log(error);
//       dispatch(asyncActionError());
//     }
//   };
// };
