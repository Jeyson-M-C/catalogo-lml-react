import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategorias } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const isFirstLoad = localStorage.getItem('isFirstLoad'); // Verifica si ya se cargó antes

        if (!isFirstLoad) {
            // Primera carga: muestra el loader durante 3.5 segundos
            setTimeout(() => {
                fetchCategorias().then((data) => {
                    setCategorias(data);
                    setIsLoading(false); // Oculta el loader después de cargar los datos
                    localStorage.setItem('isFirstLoad', 'true'); // Marca que ya se cargó
                });
            }, 3300);
        } else {
            // No es la primera carga: carga los datos directamente
            fetchCategorias().then((data) => {
                setCategorias(data);
                setIsLoading(false); // Oculta el loader cuando los datos estén listos
            });
        }
    }, []);

    if (isLoading) {
        return (
            <div className="loader mt-5">
                <div className="tars">
                    <div className="container 1">
                        <div className="shape">
                            <div className="f"></div>
                            <div className="b"></div>
                            <div className="l"></div>
                            <div className="r"></div>
                            <div className="t"></div>
                            <div className="bot"></div>
                        </div>
                    </div>
                    <div className="container 2">
                        <div className="shape">
                            <div className="f"></div>
                            <div className="b"></div>
                            <div className="l"></div>
                            <div className="r"></div>
                            <div className="t"></div>
                            <div className="bot"></div>
                        </div>
                    </div>
                    <div className="container 3">
                        <div className="shape">
                            <div className="f"></div>
                            <div className="b"></div>
                            <div className="l"></div>
                            <div className="r"></div>
                            <div className="t"></div>
                            <div className="bot"></div>
                        </div>
                    </div>
                    <div className="container 4">
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
        );
    }


    return (
        <div className="container-xl">
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
                                <button className="learn-more" onClick={() => navigate('/categorias-form', { state: { categoriaEdit: cat } })}>
                                    Editar
                                </button>
                            )}
                            <button className="btn" onClick={() => navigate(`/enlaces/${cat._id}`, { state: { categoria: cat } })}>
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
