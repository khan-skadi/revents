import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { format } from 'date-fns';

import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const { event } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon="right"
                    color="red"
                    content="This event has been cancelled"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {format(event.date.toDate(), 'EEEE do LLL')}at{' '}
            {format(event.date.toDate(), 'h:mm a')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {/* Right side of double ampersand will only be executed if left side is true */}
            {event.attendees &&
              Object.values(event.attendees).map((attendee, index) => (
                <EventListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            // to take the information from the onClick event itself you pass the evt parameter
            as={Link}
            to={`/events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
