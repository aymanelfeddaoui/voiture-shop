import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() {
    const { username, onLogout } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Link to="/" className="navbar-brand">
          🚗 MIOLA Shop
        </Link>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="me-auto">
            <Link to="/add" className="nav-link">Ajouter une Voiture</Link>
            <Link to="/list" className="nav-link">Liste des Voitures</Link>
            <Link to="/ai" className="nav-link">🤖 Assistant IA</Link>
          </Nav>
          {username && (
            <Nav>
              <Navbar.Text className="me-3 text-white">
                Bonjour <strong>{username}</strong>
              </Navbar.Text>
              <Button variant="outline-danger" size="sm" onClick={onLogout}>
                Déconnexion
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;