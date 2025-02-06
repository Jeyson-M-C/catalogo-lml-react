import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategorias, crearEnlace, actualizarEnlace } from '../../services/api';

const EnlaceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener enlace para editar (si existe)
  const enlaceEdit = location.state?.enlaceEdit || null;

  const [titulo, setTitulo] = useState(enlaceEdit?.titulo || '');
  const [url, setUrl] = useState(enlaceEdit?.url || '');
  const [descripcion, setDescripcion] = useState(enlaceEdit?.descripcion || '');
  const [categoriaId, setCategoriaId] = useState(enlaceEdit?.categoria_id || '');
  const [categorias, setCategorias] = useState([]);

  // Cargar categorías disponibles al montar el componente
  useEffect(() => {
    fetchCategorias()
      .then((data) => {
        setCategorias(data);
      })
      .catch((err) => console.error('Error al cargar categorías:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (enlaceEdit) {
        // Si existe un enlace, actualiza en lugar de crear uno nuevo
        await actualizarEnlace(enlaceEdit._id, { titulo, url, descripcion, categoria_id: categoriaId });
        alert('Enlace actualizado correctamente');
      } else {
        await crearEnlace({ titulo, url, descripcion, categoria_id: categoriaId });
        alert('Enlace creado correctamente');
      }
      
      navigate('/enlaces'); // Redirigir a la lista de enlaces
    } catch (error) {
      console.error('Error al guardar el enlace:', error);
      alert('Error al guardar el enlace');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{enlaceEdit ? 'Editar Enlace' : 'Crear Enlace'}</h2>

      <label>
        Título:
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </label>

      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>

      <label>
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </label>

      <label>
        Categoría:
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">{enlaceEdit ? 'Actualizar Enlace' : 'Crear Enlace'}</button>
    </form>
  );
};

export default EnlaceForm;
