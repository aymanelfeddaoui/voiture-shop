import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
  render() {
    const { show, message, type } = this.props.children;
    const isSuccess = type === 'success';
    const toastCss = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
    };

    return (
      <div style={show ? toastCss : null}>
        <Toast
          className={`border text-white ${isSuccess ? 'bg-success border-success' : 'bg-danger border-danger'}`}
          show={show}
        >
          <Toast.Header
            className={`text-white ${isSuccess ? 'bg-success' : 'bg-danger'}`}
            closeButton={false}
          >
            <strong className="me-auto">
              {isSuccess ? '✅ Succès' : '❌ Erreur'}
            </strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}