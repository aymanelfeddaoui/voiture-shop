import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import MyToast from './MyToast';
import api from '../services/api';

export default class Voiture extends Component {
  initialState = {
    marque: '', modele: '', couleur: '',
    immatricule: '', prix: '', annee: '',
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState, show: false };
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match?.params || {};
    if (id) {
      api.get(`/voitures/${id}`)
        .then(res => this.setState(res.data))
        .catch(err => console.error(err));
    }
  }

  resetVoiture = () => this.setState(() => this.initialState);

  voitureChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitVoiture = (event) => {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix,
    };
    const { id } = this.props.match?.params || {};
    const request = id
      ? api.put(`/voitures/${id}`, voiture)
      : api.post('/voitures', voiture);

    request.then(res => {
      if (res.data != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        if (!id) this.resetVoiture();
      }
    }).catch(err => console.error(err));
  };

  render() {
    const { marque, modele, couleur, immatricule, prix, annee } = this.state;
    const { id } = this.props.match?.params || {};

    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast children={{
            show: this.state.show,
            message: id ? 'Voiture modifiée avec succès.' : 'Voiture enregistrée avec succès.',
            type: 'success',
          }} />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            ➕ {id ? 'Modifier la Voiture' : 'Ajouter une Voiture'}
          </Card.Header>
          <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control required name="marque" type="text"
                    value={marque} onChange={this.voitureChange}
                    className="bg-dark text-white" autoComplete="off"
                    placeholder="Entrez la marque" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control required name="modele" type="text"
                    value={modele} onChange={this.voitureChange}
                    className="bg-dark text-white" autoComplete="off"
                    placeholder="Entrez le modèle" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control required name="couleur" type="text"
                    value={couleur} onChange={this.voitureChange}
                    className="bg-dark text-white" autoComplete="off"
                    placeholder="Entrez la couleur" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control required name="immatricule" type="text"
                    value={immatricule} onChange={this.voitureChange}
                    className="bg-dark text-white" autoComplete="off"
                    placeholder="Ex: A-1-9090" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix (MAD)</Form.Label>
                  <Form.Control required name="prix" type="number"
                    value={prix} onChange={this.voitureChange}
                    className="bg-dark text-white" autoComplete="off"
                    placeholder="Ex: 95000" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Année</Form.Label>
                  <Form.Control required name="annee" type="number"
                    value={annee} onChange={this.voitureChange}
                    className="bg-dark text-white" autoComplete="off"
                    placeholder="Ex: 2020" />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right' }}>
              <Button size="sm" variant="success" type="submit">💾 Submit</Button>
              {' '}
              <Button size="sm" variant="info" type="reset">↩️ Reset</Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}