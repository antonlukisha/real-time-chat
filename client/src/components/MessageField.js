import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const MessageField = ({ messages = [], endRef }) => {

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' }); // for scrolling before this ref
    }
  }, [messages, endRef]); // by change of messages, endRef

  return (
    <div>
      <ListGroup variant="flush">
        {messages.map((message, index) => ( // show all messages 
          <ListGroupItem
            key={index}
            className={`d-flex flex-column p-3 shadow mb-2 bg-body rounded`}>
            <div className="d-flex justify-content-start align-items-center">
              <strong className="text-primary">{message.username}</strong>
              <span className="text-muted ms-2 small"> ({new Date(message.timestamp).toLocaleString()})</span>
            </div>
            <div className="text-wrap">{message.content}</div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default MessageField;
