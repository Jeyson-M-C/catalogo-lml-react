import axios from 'axios';


const API_URL =  process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/usuarios/login`, { username, password });
  return response.data;
};

export const fetchNoticias = async (q = "tecnología", language = "es") => {
  try {
    const response = await fetch(`${API_URL}/noticias?q=${q}&language=${language}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      const sortedNoticias = data.articles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      return sortedNoticias; // Devuelve las noticias ordenadas
    } else {
      throw new Error(`Error al obtener noticias. Código: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    throw error;
  }
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

export const eliminarCategoria = async (categoriaId) => {
  try {
      const response = await axios.delete(`${API_URL}/categorias/${categoriaId}`);
      return response.data;
  } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      throw error; // Re-lanza el error para que el componente lo maneje
  }
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
      const response = await fetch(`${API_URL}/enlaces/enlaces-por-categoria/${categoriaId}`);
      if (!response.ok) {
          throw new Error(`No se pudieron obtener los enlaces. Código de estado: ${response.status}`);
      }
      return await response.json();
  } catch (error) {
      console.error("Error al obtener enlaces por categoría:", error);
      return { enlaces: [] };
  }
};



// Crear un subenlace
export const crearSubenlace = async (subenlace) => {
  const response = await axios.post(`${API_URL}/subenlaces/`, subenlace);
  return response.data;
};

// Obtener subenlaces por enlace
export const fetchSubenlacesPorEnlace = async (id) => {
  try {
      const response = await fetch(`${API_URL}/subenlaces/${id}`);
      if (!response.ok) {
          throw new Error("No se pudieron obtener los subelaces.");
      }
      return await response.json();
  } catch (error) {
      console.error("Error al obtener subelaces:", error);
      return { message: "Error al cargar datos." };
  }
};

// Actualizar un subenlace
export const actualizarSubenlace = async (subenlaceId, subenlaceData) => {
  const response = await axios.put(`${API_URL}/subenlaces/${subenlaceId}`, subenlaceData);
  return response.data;
};





