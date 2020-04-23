import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getEventsForDashboard } from '../eventActions.js';
import { Grid, Loader } from 'semantic-ui-react';

import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent.jsx';
import EventActivity from '../EventActivity/EventActivity.jsx';

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  // Store events in local state as we get them, so new events gotten from More button will show below the previous events.
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard(); // Because im returning a query snapshot from this function i initialize it in a variable 'next'

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      });
    }
  };

  getNextEvents = async () => {
    const { events } = this.props;

    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };
  // Redux delete
  // handleDeleteEvent = id => {
  //   this.props.deleteEvent(id);
  // };
  // Local state delete
  // handleDeleteEvent = id => {
  //   this.setState(({ events }) => ({
  //     events: events.filter(e => e.id !== id)
  //   }));
  // };

  render() {
    const { loading } = this.props;
    const { moreEvents, loadedEvents } = this.state;

    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={loadedEvents}
            loading={loading}
            moreEvents={moreEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
