import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';

const LoginForm = ({ username, setUsername, channelName, setChannelName, joinChannel }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="shadow-lg rounded bg-white" style={{padding: "40px"}}>

        <h3 className="text-center mb-4">Welcome to the Chat</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            {/* simple authification without password */}
            <Form.Control
              type="text"
              value ={username}
              placeholder="Enter username..."
                
              onChange = {(event) => setUsername(event.target.value)} // prop for change input stage change temporary value
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Channel</Form.Label>
            <Form.Control // input channel name
              type = "text"
              placeholder ="Enter channel name..."
              value = {channelName} 
              onChange = {(event) => setChannelName(event.target.value)} // prop for change input stage change temporary value 
            />
          </Form.Group>

          <Button className="w-100" variant="primary" onClick = {joinChannel}>Join</Button>

        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
