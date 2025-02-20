import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { crearCategoria, actualizarCategoria } from '../../services/api';

const CategoriasForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const categoriaEdit = location.state?.categoriaEdit || null;

    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (categoriaEdit) {
            setNombre(categoriaEdit.nombre || '');
        }
    }, [categoriaEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (categoriaEdit) {
                await actualizarCategoria(categoriaEdit._id, { nombre });
            } else {
                await crearCategoria({ nombre });
            }
            navigate('/categorias');
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
            alert(`Error: ${error.message}`); // Muestra el error en un alert
        }
    };

    return (
        <div className="form">
  <h2 className="form-heading">
    {categoriaEdit ? 'Editar Categoría' : 'Crear Categoría'}
  </h2>
  <form onSubmit={handleSubmit} className="form">
    <div className="form-field form-card1">
    <label className="input-label">Nombre:</label>
    <input
    type="text"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    required
    className="input-field"
    />
    </div>

    <div className="form-button-container">
      <button type="submit" className="sendMessage-btn">
        {categoriaEdit ? 'Actualizar' : 'Crear'}
      </button>
    </div>
  </form>
</div>
    );
};

export default CategoriasForm;
