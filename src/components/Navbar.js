import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
      <div className="nav">
  <div className="container-nav">
      <Link to="/">
      <button className="btn-nav">
      Inicio
      </button>
      </Link>
      <Link to="/categorias">
      <button className="btn-nav">
      Categorías
      </button>
      </Link>
      <Link to="/enlaces">
      <button className="btn-nav">
        Enlaces
      </button>
      </Link>
    {isAuthenticated && (
      <>
        <Link to="/enlaces-form">
        <button className="btn-nav">
        Crear Enlaces
        </button>
        </Link>
        <Link to="/categorias-form">
        <button className="btn-nav">
        Crear Categorías
        </button>
        </Link>
        <button className="btn-nav logout-btn" onClick={logout}>
          Cerrar Sesión
        </button>
      </>
    )}
  </div>
</div>
    );
};

export default Navbar;

