import { FETCH_EVENTS } from './eventConstants.js';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions.js';
import { fetchSampleData } from '../../app/data/mockApi.js';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers.js';

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

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
