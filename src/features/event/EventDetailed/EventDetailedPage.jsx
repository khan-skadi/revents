import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import {
  objectToArray,
  createDataTree
} from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions.js';
import { addEventComment } from '../eventActions.js';
import { Grid } from 'semantic-ui-react';

import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(event => event.id === eventId)[0] ||
      {};
  }

  return {
    event,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[eventId])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);

    // Using firestore.get().
    // if (!event.exists) {
    //   history.push('/events'); // Or you can create a 404 page and push the user there.
    //   toastr.error('Oops', 'Event not found');
    // }
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat
    } = this.props;

    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid); // includes() is for primitive array(list of strings or numbers). some() is for an object that has a specific property you need.
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={chatTree}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapStateToProps, actions),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
