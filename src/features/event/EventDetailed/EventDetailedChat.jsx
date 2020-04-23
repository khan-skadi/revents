import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';

import EventDetailedChatForm from './EventDetailedChatForm.jsx';

const EventDetailedChat = ({ addEventComment, eventId, eventChat }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {eventChat &&
            eventChat.map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
        <EventDetailedChatForm
          addEventComment={addEventComment}
          eventId={eventId}
        />
      </Segment>
    </Fragment>
  );
};

export default EventDetailedChat;
