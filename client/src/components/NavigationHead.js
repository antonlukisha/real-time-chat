import React from 'react';
import UserSearch from './UserSearch';
import { Form, Container, Nav, Navbar } from 'react-bootstrap';

const NavigationHead = ({ setSearchedMember, userList, channelName, setUsername }) => {
  return (
    <Navbar className="fixed-top bg-light shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand className="fw-bold text-white rounded bg-primary" style={{padding: "10px"}}>RealTimeChat</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Brand>{channelName}</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Form className="d-flex">
              <UserSearch userList={userList} setUsername={setUsername}/>
            </Form>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    );
};

export default NavigationHead