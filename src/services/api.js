import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const fetchCategorias = async () => {
  const response = await axios.get(`${API_URL}/categorias/`);
  return response.data;
};

export const fetchEnlaces = async () => {
  const response = await axios.get(`${API_URL}/enlaces/`);
  return response.data;
};

export const crearCategoria = async (categoria) => {
  const response = await axios.post(`${API_URL}/categorias/`, categoria);
  return response.data;
};


export const actualizarCategoria = async (categoriaId, data) => {
  const response = await fetch(`${API_URL}/categorias/${categoriaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en la API:", errorText); // Muestra el error real
      throw new Error("Error al actualizar la categoría");
  }

  return await response.json();
};


export const crearEnlace = async (enlace) => {
  const response = await axios.post(`${API_URL}/enlaces/`, enlace);
  return response.data;
};

// Actualizar un enlace existente
export const actualizarEnlace = async (id, enlaceData) => {
  const response = await axios.put(`${API_URL}/enlaces/${id}`, enlaceData);
  return response.data;
};

export const fetchEnlacesPorCategoria = async (categoriaId) => {
  try {
      const response = await fetch(`${API_URL}/enlaces-por-categoria/${categoriaId}`);
      if (!response.ok) {
          throw new Error("No se pudieron obtener los enlaces.");
      }
      return await response.json();
  } catch (error) {
      console.error("Error al obtener enlaces por categoría:", error);
      return { enlaces: [] };
  }
};


