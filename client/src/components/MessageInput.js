import React from 'react';
import { Button, Form } from 'react-bootstrap';

const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    // fix input fielt botton of our page
    <div className="fixed-bottom input-group shadow" style={{ height: 70}}>
    
      <Form.Control
        size="lg"
        className="form-control"
        type="text"
        value={message}
        placeholder="Type smth..."
        style={{ width: 160, fontFamily: 'Roboto', fontSize: '22px' }}
        onChange={(event)=>setMessage(event.target.value)} // when change input stage change temporary value
      />

      <Button className="fw-bold" variant="primary" size="lg" onClick={sendMessage} style={{ width: 160, fontSize: '30px' }}>Send</Button>

    </div>
  );
};

export default MessageInput;
