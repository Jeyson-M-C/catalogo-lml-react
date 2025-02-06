import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnlaces } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Enlaces = () => {
    const [enlaces, setEnlaces] = useState([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const cargarEnlaces = async () => {
        try {
            const data = await fetchEnlaces();
            setEnlaces(data);
        } catch (error) {
            console.error('Error al cargar enlaces:', error);
        }
    };

    useEffect(() => {
       
            cargarEnlaces();
        
    }, []);

    return (
        <div>
            <h2>Enlaces</h2>

            {isAuthenticated && (
                <button onClick={() => navigate('/enlaces-form')}>Crear Enlace</button>
            )}

            <ul>
                {enlaces.map((enlace) => (
                    <li key={enlace._id}>
                        <strong>{enlace.titulo}</strong> <br />
                        <a href={enlace.url} target="_blank" rel="noopener noreferrer">
                            {enlace.url}
                        </a> <br />
                        <small>Descripción: {enlace.descripcion}</small> <br />
                        <small>Categoría: {enlace.categoria_nombre || 'Sin categoría'}</small> <br />

                        {isAuthenticated && (
                            <button onClick={() => navigate('/enlaces-form', { state: { enlaceEdit: enlace } })}>
                                Editar
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Enlaces;
