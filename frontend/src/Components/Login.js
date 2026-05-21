import React, { Component } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default class Login extends Component {
  state = { username: '', password: '', error: '', loading: false };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: '' });
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username: this.state.username,
        password: this.state.password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      this.props.onLogin(res.data.username);
    } catch (err) {
      this.setState({ error: 'Identifiants incorrects. Essayez admin / admin' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="border border-dark bg-dark text-white">
              <Card.Header>🚗 Voiture Shop — Connexion</Card.Header>
              <Card.Body>
                {this.state.error && (
                  <Alert variant="danger">{this.state.error}</Alert>
                )}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <Form.Control
                      type="text"
                      className="bg-dark text-white"
                      placeholder="admin"
                      value={this.state.username}
                      onChange={(e) => this.setState({ username: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      className="bg-dark text-white"
                      placeholder="admin"
                      value={this.state.password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100"
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </Form>
                <small className="text-muted mt-2 d-block text-center">
                  Comptes test : admin/admin · user/user
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}