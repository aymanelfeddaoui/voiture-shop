import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import Login from './Components/Login';
import AiAssistant from './Components/AiAssistant';

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );

  const handleLogin = (user) => setUsername(user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  if (!username) {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <NavigationBar username={username} onLogout={handleLogout} />
      <Container style={{ marginBottom: '60px' }}>
        <Row>
          <Col lg={12} style={{ marginTop: '20px' }}>
            <Switch>
              <Route path="/" exact component={Bienvenue} />
              <Route path="/add" exact component={Voiture} />
              <Route path="/edit/:id" exact component={Voiture} />
              <Route path="/list" exact component={VoitureListe} />
              <Route path="/ai" exact component={AiAssistant} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;