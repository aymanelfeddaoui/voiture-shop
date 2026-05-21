import React, { Component } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

export default class AiAssistant extends Component {
  state = { message: '', response: '', loading: false, error: '' };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.message.trim()) return;
    this.setState({ loading: true, error: '', response: '' });
    try {
      const res = await api.post('/api/ai/chat', { message: this.state.message });
      this.setState({ response: res.data.response });
    } catch (err) {
      this.setState({ error: 'Erreur IA. Vérifiez votre clé API Anthropic.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>🤖 Assistant IA — Conseiller Voitures</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Posez votre question sur les voitures</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                className="bg-dark text-white"
                placeholder="Ex: Quelle est la différence entre Toyota et Honda ?"
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="success" disabled={this.state.loading}>
              {this.state.loading ? '⏳ En cours...' : '📨 Envoyer'}
            </Button>
          </Form>
          {this.state.error &&
            <Alert variant="danger" className="mt-3">{this.state.error}</Alert>}
          {this.state.response && (
            <Alert variant="info" className="mt-3">
              <strong>Claude :</strong><br />{this.state.response}
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  }
}