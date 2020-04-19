import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions.js';
import cuid from 'cuid';
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
  // handleIsOpenToggle = () => {
  //   // Toggle type of functionality. destructured from prevState ( without curly brackets )
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.props.createEvent(newEvent);
    // Spread the events from the previous state, and add the new event.
    // this.setState(({ events }) => ({
    //   events: [...events, newEvent],
    //   isOpen: false
    // }));
  };

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    // this.setState(({ events }) => ({
    //   events: events.map(event => {
    //     if (event.id === updatedEvent.id) {
    //       return { ...updatedEvent };
    //     } else {
    //       return event;
    //     }
    //   }),
    //   isOpen: false,
    //   selectedEvent: null
    // }));
  };

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
