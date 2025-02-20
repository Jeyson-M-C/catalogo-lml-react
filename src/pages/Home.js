import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="notification">
      <div className="notiglow"></div>
      <div className="notiborderglow"></div>
      <div className="notititle">Navegación</div>
      <div className="notibody">
        <div className="cards-container">
          <Link to="/categorias">
          <button-lml>
          Categorías
          </button-lml>
          </Link>
          <Link to="/enlaces">
          <button-lml>
          Enlaces
          </button-lml>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
