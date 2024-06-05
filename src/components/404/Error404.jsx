import React from 'react';
import './Error404.css';
import {Link} from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="error-container">
      <h1 className="error-message-h1">Error 404</h1>
      <p className="error-message">La página que buscas no existe o ha sido eliminada.</p>
      <p className="error-message"><Link to={"/"}>Volver al inicio</Link></p>
    </div>
  );
};

export default Error404;