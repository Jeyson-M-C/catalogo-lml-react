import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Catalogo LML</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Inicio</Link>
              </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categorias">Categorias</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/enlaces">Enlaces</Link>
                  </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/enlaces-form">Crear Enlaces</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categorias-form">Crear Categorias</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={logout}>Cerrar Sesión</button>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Buscar" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;

