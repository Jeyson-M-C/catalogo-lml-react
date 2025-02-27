import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnlaces } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Enlaces = () => {
  const [enlaces, setEnlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const cargarEnlaces = async () => {
    try {
      const data = await fetchEnlaces();
      setEnlaces(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar enlaces:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarEnlaces();
  }, []);

  if (isLoading) {
    return (
        <div className="container-xl">
            <div className="loader mt-5">
                <div className="tars">
          <div className="container-loader 1">
            <div className="shape">
              <div className="f"></div>
              <div className="b"></div>
              <div className="l"></div>
              <div className="r"></div>
              <div className="t"></div>
              <div className="bot"></div>
            </div>
          </div>
          <div className="container-loader 2">
            <div className="shape">
              <div className="f"></div>
              <div className="b"></div>
              <div className="l"></div>
              <div className="r"></div>
              <div className="t"></div>
              <div className="bot"></div>
            </div>
          </div>
          <div className="container-loader 3">
            <div className="shape">
              <div className="f"></div>
              <div className="b"></div>
              <div className="l"></div>
              <div className="r"></div>
              <div className="t"></div>
              <div className="bot"></div>
            </div>
          </div>
          <div className="container-loader 4">
            <div className="shape">
              <div className="f"></div>
              <div className="b"></div>
              <div className="l"></div>
              <div className="r"></div>
              <div className="t"></div>
              <div className="bot"></div>
            </div>
          </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container-xl notifications-container">
      <h2>Enlaces</h2>

      {isAuthenticated && (
        <button
          className="success-button-main"
          onClick={() => navigate('/enlaces-form')}
        >
          Crear Enlace
        </button>
      )}

      <ul>
        {enlaces.map((enlace) => (
          <div key={enlace._id} className="success">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="succes-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="success-prompt-wrap">
                <p className="success-prompt-heading">{enlace.titulo}</p>
                <div className="success-prompt-prompt">
                  <p>
                    <a
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="success-link"
                    >
                      {enlace.url}
                    </a>
                  </p>
                  <p>Descripción: {enlace.descripcion}</p>
                  <p className="success-prompt-heading">
                    Categoría: {enlace.categoria_nombre || 'Sin categoría'}
                  </p>
                    <button 
                        type="button" 
                        className="success-button-main"
                        onClick={() => navigate(`/subenlaces/${enlace._id}`)}>
                        Ver subenlaces
                    </button>
                </div>
                {isAuthenticated && (
                  <div className="success-button-container">
                    <button
                      type="button"
                      className="success-button-main"
                      onClick={() =>
                        navigate('/enlaces-form', { state: { enlaceEdit: enlace } })
                      }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="success-button-main"
                      onClick={() =>
                        navigate('/subenlaces-form', { state: { enlaceId: enlace._id } })
                      }
                    >
                      Crear Subenlace
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Enlaces;
