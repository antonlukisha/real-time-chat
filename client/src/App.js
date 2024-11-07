import React from 'react';
import './App.css';
import MainWindow from './components/MainWindow';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-5">
      <MainWindow />
    </Container>
  );
}

export default App;
