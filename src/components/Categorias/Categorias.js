import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategorias } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategorias().then(setCategorias);
    }, []);

    return (
        <div>
            <h2>Categorías</h2>

            {isAuthenticated && (
                <button onClick={() => navigate('/categorias-form')}>Crear Categoría</button>
            )}

            <ul>
                {categorias.map((cat) => (
                    <li key={cat._id}>
                        {isAuthenticated && (
                            <button onClick={() => navigate('/categorias-form', { state: { categoriaEdit: cat } })}>
                                Editar
                            </button>
                        )}
                        
                        <button onClick={() => navigate(`/enlaces/${cat._id}`, { state: { categoria: cat } })}>
                            <strong>{cat.nombre}</strong> - Ver Enlaces
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categorias;
