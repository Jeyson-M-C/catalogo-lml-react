import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchEnlacesPorCategoria, fetchSubenlacesPorEnlace } from '../../services/api';

const EnlacesPorCategoriaPage = () => {
    const { categoriaId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const categoria = location.state?.categoria || null;

    const [enlaces, setEnlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subenlaces, setSubenlaces] = useState({}); // Para almacenar subenlaces por enlaceId
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarEnlaces = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchEnlacesPorCategoria(categoriaId);
                if (data && data.enlaces) {
                    setEnlaces(data.enlaces);
                } else {
                    setError("No se encontraron enlaces para esta categoría.");
                }
            } catch (err) {
                console.error("Error al cargar enlaces:", err);
                setError("Error al cargar los enlaces. Por favor, inténtalo de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        if (categoriaId) {
            cargarEnlaces();
        } else {
            setError("No se proporcionó un ID de categoría.");
            setLoading(false);
        }
    }, [categoriaId]);

    // Cargar subenlaces por enlace
    useEffect(() => {
        if (enlaces.length > 0) {
            enlaces.forEach((enlace) => {
                fetchSubenlacesPorEnlace(enlace._id)
                    .then((data) => {
                        setSubenlaces((prev) => ({
                            ...prev,
                            [enlace._id]: data.subenlaces || [],
                        }));
                    })
                    .catch((error) => {
                        console.error(`Error al cargar subenlaces para el enlace ${enlace._id}:`, error);
                    });
            });
        }
    }, [enlaces]);

    if (!categoria) return <p>Error: No se encontró la categoría</p>;
    if (loading) return <p>Cargando enlaces...</p>;
    if (error) return <p>{error}</p>; // Mostrar el mensaje de error

    return (
        <div className="container-xl">
            <h2>Enlaces de {categoria.nombre}</h2>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Volver</button>

            <div className="card-subenlace">
    <span className="card-title">{categoria.nombre}</span>
    <div className="card-container-subenlace">
        {enlaces.length > 0 ? (
            enlaces.map((enlace) => (
                <div key={enlace._id} className="enlace-item">
                    <div className="enlace-container">
                        <a
                            href={enlace.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="full-width-link"
                        >
                            <p className="element-subenlace enlace-titulo">{enlace.titulo}</p>
                        </a>

                        {subenlaces[enlace._id] && subenlaces[enlace._id].length > 0 ? (
                            subenlaces[enlace._id].map((subenlace) => (
                                <div key={subenlace._id} className="subenlace-container">
                                    <a
                                        href={subenlace.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="full-width-link"
                                    >
                                        <p className="element-subenlace subenlace">{subenlace.titulo}</p>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="element-subenlace2 subenlace">No hay subenlaces para este enlace.</p>
                        )}
                    </div>
                </div>
            ))
        ) : (
            <p className="element">No hay enlaces en esta categoría.</p>
        )}
    </div>
</div>

        </div>
    );
};

export default EnlacesPorCategoriaPage;
