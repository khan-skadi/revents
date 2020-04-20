import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions.js';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';

const mapStateToProps = state => ({
  events: state.events
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
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

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, actions)(EventDashboard);
