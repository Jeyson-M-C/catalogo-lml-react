import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchEnlacesPorCategoria } from '../../services/api';

const EnlacesPorCategoriaPage = () => {
    const { categoriaId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const categoria = location.state?.categoria || null;
    
    const [enlaces, setEnlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoriaId) {  
            fetchEnlacesPorCategoria(categoriaId)
                .then((data) => {
                    setEnlaces(data.enlaces || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al cargar enlaces:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [categoriaId]); 
    

    if (!categoria) return <p>Error: No se encontró la categoría</p>;
    if (loading) return <p>Cargando enlaces...</p>;

    return (
        <div>
            <h2>Enlaces de {categoria.nombre}</h2>
            <button onClick={() => navigate(-1)}>Volver</button>

            <ul>
                {enlaces.length > 0 ? (
                    enlaces.map((enlace) => (
                        <li key={enlace._id}>
                            <a href={enlace.url} target="_blank" rel="noopener noreferrer">
                                {enlace.titulo}
                            </a>
                        </li>
                    ))
                ) : (
                    <p>No hay enlaces en esta categoría.</p>
                )}
            </ul>
        </div>
    );
};

export default EnlacesPorCategoriaPage;