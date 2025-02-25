import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { crearCategoria, actualizarCategoria, eliminarCategoria } from '../../services/api';

const CategoriasForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoriaEdit = location.state?.categoriaEdit || null;

  const [nombre, setNombre] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categoriaEdit) {
      setNombre(categoriaEdit.nombre || '');
    }
  }, [categoriaEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre.length < 3 || nombre.length > 100) {
      alert("El nombre debe tener entre 3 y 100 caracteres.");
      return;
    }

    try {
      if (categoriaEdit) {
        await actualizarCategoria(categoriaEdit._id, { nombre });
      } else {
        await crearCategoria({ nombre });
      }
      navigate('/categorias');
    } catch (error) {
      if(error.response && error.response.status === 400){
          const errorMessage = error.response.data.detail;
          alert(`Error: ${errorMessage}`);
      } else if (error.response && error.response.status === 500) {
        alert("Error interno del servidor. El título del enlace ya está registrado.");
      }else {
          console.error('Error al guardar la categoría:', error);
          alert(`Error: ${error.message}`);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      try {
        if (categoriaEdit) {
          await eliminarCategoria(categoriaEdit._id);
          navigate('/categorias');
        } else {
          console.warn("No se puede eliminar una categoría que no ha sido creada.");
        }
      } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        alert(`Error al eliminar la categoría: ${error.message}`);
      }
    }
  };

  return (
    <div className="container-xl">
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
            {errors.nombre && <div className="error-message">{errors.nombre}</div>}
          </div>

          <div className="form-button-container">
            <button type="submit" className="sendMessage-btn">
              {categoriaEdit ? 'Actualizar' : 'Crear'}
            </button>
            {categoriaEdit && (
              <button
                type="button"
                className="sendMessage-btn"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriasForm;
