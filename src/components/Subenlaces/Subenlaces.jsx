import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSubenlacesPorEnlace, fetchEnlaces } from '../../services/api'; // Funciones disponibles
import { useAuth } from '../../context/AuthContext';


const Subenlaces = () => {
    const { enlaceId } = useParams(); // Obtén el enlaceId desde la URL
    const [subenlaces, setSubenlaces] = useState([]);
    const [enlace, setEnlace] = useState(null); // Para los detalles del enlace
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    // Función para cargar subenlaces
    const cargarSubenlaces = async () => {
      try {
        // Obtener detalles del enlace
        const enlacesData = await fetchEnlaces(); // O usa la función adecuada
        const enlaceEncontrado = enlacesData.find((enlace) => enlace._id === enlaceId);
        setEnlace(enlaceEncontrado);
  
        // Obtener los subenlaces
        const data = await fetchSubenlacesPorEnlace(enlaceId);
        setSubenlaces(data.subenlaces || []);
      } catch (error) {
        setError('Error al cargar subenlaces');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      cargarSubenlaces();
    }, [enlaceId]);
  
    if (loading) {
      return <p>Cargando subenlaces...</p>;
    }
  
    return (
      <div className="container-xl notifications-container">
        <h2>Subenlaces para el Enlace: "{enlace?.titulo || 'Cargando...'}"</h2>
  
        {error && <p className="text-danger">{error}</p>}
  
        {/* Mostrar detalles del enlace solo si existe */}
        {enlace ? (
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
            </div>
          </div>
        ) : (
          <p>Detalles del enlace no disponibles.</p>
        )}
  
        {/* Mostrar los subenlaces */}
        <ul>
          {subenlaces.length === 0 ? (
            <p>No hay subenlaces disponibles.</p>
          ) : (
            subenlaces.map((subenlace) => (
              <div key={subenlace._id} className="success">
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
                    <p className="success-prompt-heading">{subenlace.titulo}</p>
                    <div className="success-prompt-prompt">
                      <p>
                        <a
                          href={subenlace.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="success-link"
                        >
                          {subenlace.url}
                        </a>
                      </p>
                      <p>Descripción: {subenlace.descripcion}</p>
                      <p className="success-prompt-heading">
                        Categoría: {enlace?.categoria_nombre || 'Sin categoría'}
                      </p>
                    </div>
                    {isAuthenticated && (
                      <div className="success-button-container">
                        <button
                          type="button"
                          className="success-button-main"
                          onClick={() =>{
                            navigate('/subenlaces-form', {
                              state: { subenlaceEdit: subenlace, enlaceId: enlace._id },
                            });
                          }}
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </ul>
      </div>
    );
  };
  
  export default Subenlaces;
  