import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyToast from './MyToast';
import api from '../services/api';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = { voitures: [], show: false };
  }

  componentDidMount() {
    api.get('/voitures')
      .then(res => this.setState({ voitures: res.data }))
      .catch(err => console.error(err));
  }

  deleteVoiture = (voitureId) => {
    api.delete(`/voitures/${voitureId}`)
      .then(res => {
        if (res.data != null) {
          this.setState({
            voitures: this.state.voitures.filter(v => v.id !== voitureId),
            show: true,
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast children={{ show: this.state.show, message: 'Voiture supprimée avec succès.', type: 'danger' }} />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>📋 Liste des Voitures</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Aucune voiture disponible</td>
                  </tr>
                ) : (
                  this.state.voitures.map(voiture => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={`/edit/${voiture.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >✏️</Link>
                          {' '}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteVoiture(voiture.id)}
                          >🗑️</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}