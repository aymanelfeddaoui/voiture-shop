import React from 'react';
import { Jumbotron } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    return (
      <div className="p-5 mb-4 bg-dark text-white rounded">
        <h1>Bienvenue dans votre Magasin de Voitures</h1>
        <p>Le meilleur de nos voitures est exposé près de chez vous</p>
        <footer className="blockquote-footer text-white-50">Master MIOLA</footer>
      </div>
    );
  }
}

export default Bienvenue;