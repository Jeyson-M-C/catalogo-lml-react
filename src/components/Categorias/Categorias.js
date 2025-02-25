import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategorias } from '../../services/api'; // Suponiendo que esta función obtiene las categorías
import { useAuth } from '../../context/AuthContext'; // Contexto de autenticación

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Cargar categorías
    useEffect(() => {
        const isFirstLoad = localStorage.getItem('isFirstLoad'); // Para verificar si es la primera carga

        if (!isFirstLoad) {
            setTimeout(() => {
                fetchCategorias().then((data) => {
                    setCategorias(data);
                    setIsLoading(false); // Ocultar el loader cuando la carga termina
                    localStorage.setItem('isFirstLoad', 'true'); // Marcar como cargada
                });
            }, 3300);
        } else {
            // Si ya fue cargado previamente, solo mostramos las categorías
            fetchCategorias().then((data) => {
                setCategorias(data);
                setIsLoading(false);
            });
        }
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
        <div className="container-xl ">
            <h2>Categorías</h2>

            {isAuthenticated && (
                <button onClick={() => navigate('/categorias-form')}>Crear Categoría</button>
            )}

            <div className="cards-container">
                {categorias.map((cat) => (
                    <div className="card" key={cat._id}>
                        <div className="heading">
                            <span>{cat.nombre}</span> {/* Nombre de la categoría */}
                        </div>
                        <div className="div-container-cats">
                            {isAuthenticated && (
                                <button
                                    className="learn-more"
                                    onClick={() =>
                                        navigate('/categorias-form', { state: { categoriaEdit: cat } })
                                    }
                                >
                                    Editar
                                </button>
                                
                            )}
                            <button
                                className="btn"
                                onClick={() =>
                                    navigate(`/enlaces/${cat._id}`, { state: { categoria: cat } })
                                }
                            >
                                Ver Enlaces
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorias;
