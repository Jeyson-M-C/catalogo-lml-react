import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchEnlaces, actualizarSubenlace, crearSubenlace, fetchSubenlacesPorEnlace } from '../../services/api';  // Funciones disponibles

const SubenlacesForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener subenlace para editar (si existe)
  const subenlaceEdit = location.state?.subenlaceEdit || null;
  const enlaceId = location.state?.enlaceId || '';  // Obtener enlaceId desde la navegación

  // Estado de los campos
  const [titulo, setTitulo] = useState(subenlaceEdit?.titulo || '');
  const [url, setUrl] = useState(subenlaceEdit?.url || '');
  const [descripcion, setDescripcion] = useState(subenlaceEdit?.descripcion || '');
  const [enlaces, setEnlaces] = useState([]);
  const [subenlaces, setSubenlaces] = useState([]);  // Estado para los subenlaces

  // Cargar enlaces disponibles para asociar al subenlace
  useEffect(() => {
    fetchEnlaces()
      .then((data) => setEnlaces(data))
      .catch((err) => console.error('Error al cargar enlaces:', err));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar al backend
    if (!titulo || titulo.trim().length < 3) {
      alert("El título debe tener al menos 3 caracteres.");
      return;
    }

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(url)) {
      alert("La URL proporcionada no es válida.");
      return;
    }

    try {
      const subenlaceData = { 
          titulo, 
          url, 
          descripcion, 
          enlace_id: enlaceId 
      };

      if (subenlaceEdit) {
          // Actualizar subenlace existente
          await actualizarSubenlace(subenlaceEdit._id, subenlaceData);
          alert('Subenlace actualizado correctamente');
      } else {
          // Crear un nuevo subenlace
          await crearSubenlace(subenlaceData);
          alert('Subenlace creado correctamente');
      }

      navigate(`/subenlaces/${enlaceId}`);
    } catch (error) {
      console.error('Error al guardar el subenlace:', error);
      
      // Manejar errores específicos del servidor
      if (error.response && error.response.status === 400) {
          alert(`Error: ${error.response.data.detail}`); // Mostrar mensaje del backend
      } else if (error.response && error.response.status === 404) {
          alert("Error: Enlace no encontrado.");
      } else if (error.response && error.response.status === 500) {
          alert("Error interno del servidor. El título del subenlace ya está registrado.");
      } else {
          alert("Error desconocido.");
      }
    }
};

  
  
  return (
    <div className="container-xl">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">
          {subenlaceEdit ? 'Editar' : 'Crear'} Subenlace
        </h2>

        <div className="form-field form-card1">
          <label className="input-label">
            Título:
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>

        <div className="form-field form-card1">
          <label className="input-label">
            URL:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>

        <div className="form-field form-card1">
          <label className="input-label">
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>
          <div className="form-field form-card1">
            <label className="input-label">
              Enlace principal:
              <select
                value={enlaceId}
                onChange={(e) => setEnlaceId(e.target.value)}
                required
                className="input-field"
              >
                <option value="">Selecciona un enlace principal</option>
                {enlaces.map((enlace) => (
                  <option key={enlace._id} value={enlace._id}>
                    {enlace.titulo}
                  </option>
                ))}
              </select>
            </label>
          </div>

        <button type="submit" className="sendMessage-btn">
          {subenlaceEdit ? 'Actualizar' : 'Crear'} Subenlace
        </button>
      </form>
    </div>
  );
};

export default SubenlacesForm;
