import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ enlaces, categorias, subenlaces, isAuthenticated }) => {
    const navigate = useNavigate();

    return (
        <div className="container-xl notifications-container results-container">
            <h2 className="results-title">Resultados de la Búsqueda</h2>

            {/* Resultados de Enlaces */}
            {enlaces.length > 0 && (
                <div className="results-section">
                    <h3 className="results-subtitle">Enlaces</h3>
                    <ul className="results-list">
                        {enlaces.map((enlace) => (
                            <div key={enlace._id} className="success results-item">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="succes-svg results-icon"
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
                                    <div className="success-prompt-wrap results-content">
                                        <p className="success-prompt-heading results-heading">{enlace.titulo}</p>
                                        <div className="success-prompt-prompt results-description">
                                            <p>
                                                <a
                                                    href={enlace.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="success-link results-link"
                                                >
                                                    {enlace.url}
                                                </a>
                                            </p>
                                            <p>Descripción: {enlace.descripcion}</p>
                                            <p className="success-prompt-heading results-category">Categoría: {enlace.categoria_nombre}</p>
                                            {isAuthenticated && (
                                                <button
                                                    type="button"
                                                    className="success-button-main results-button"
                                                    onClick={() =>
                                                        navigate('/enlaces-form', { state: { enlaceEdit: enlace } })
                                                    }
                                                >
                                                    Editar Enlace
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}

            {/* Resultados de Categorías */}
            {categorias.length > 0 && (
                <div className="results-section">
                    <h3 className="results-subtitle">Categorías</h3>
                    <ul className="results-list">
                        {categorias.map((categoria) => (
                            <li key={categoria._id} className="results-item">
                                {categoria.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Resultados de Subenlaces */}
            {subenlaces.length > 0 && (
                <div className="results-section">
                    <h3 className="results-subtitle">Subenlaces</h3>
                    <ul className="results-list">
                        {subenlaces.map((subenlace) => (
                            <li key={subenlace._id} className="results-item">
                                <span>{subenlace.titulo}</span>{" "}
                                <a
                                    href={subenlace.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="success-link results-link"
                                >
                                    {subenlace.url}
                                </a>{" "}
                                {isAuthenticated && (
                                    <button
                                        type="button"
                                        className="success-button-main results-button"
                                        onClick={() =>
                                            navigate(`/subenlaces-form`, { state: { subenlaceEdit: subenlace } })
                                        }
                                    >
                                        Editar Subenlace
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Mensaje si no hay resultados */}
            {!(enlaces.length || categorias.length || subenlaces.length) && (
                <p className="results-no-results">No se encontraron resultados</p>
            )}
        </div>
    );
};

export default SearchResults;
