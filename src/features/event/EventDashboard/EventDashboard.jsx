import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { createEvent, updateEvent } from '../eventActions.js';
import { Grid } from 'semantic-ui-react';

import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent.jsx';
import EventActivity from '../EventActivity/EventActivity.jsx';

const mapStateToProps = state => ({
  events: state.firestore.ordered.events
});

const actions = {
  createEvent,
  updateEvent
};

class EventDashboard extends Component {
  // Redux delete
  handleDeleteEvent = id => {
    this.props.deleteEvent(id);
  };
  // Local state delete
  // handleDeleteEvent = id => {
  //   this.setState(({ events }) => ({
  //     events: events.filter(e => e.id !== id)
  //   }));
  // };

  render() {
    const { events } = this.props;

    if (!isLoaded(events)) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
