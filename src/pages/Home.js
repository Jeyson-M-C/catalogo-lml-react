import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [noticias, setNoticias] = useState([]); // Estado para almacenar las noticias
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  useEffect(() => {
    const api_key = process.env.REACT_APP_NEWS_API_KEY;

    if (!api_key) {
      setError("API Key no está definida. Por favor, configura la clave API.");
      setLoading(false);
      return;
    }

    const url = "https://newsapi.org/v2/everything";

    const fetchNoticias = async () => {
      try {
        const response = await fetch(
          `${url}?q=tecnología&language=es&apiKey=${api_key}`
        );

        if (response.ok) {
          const data = await response.json();
          const sortedNoticias = data.articles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
          setNoticias(sortedNoticias); // Guardar las noticias ordenadas en el estado
        } else {
          setError("Error al obtener noticias. Código: " + response.status);
        }
      } catch (error) {
        console.error("Error al obtener noticias:", error);
        setError("Error al obtener noticias");
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []); // El array vacío asegura que la solicitud se haga solo una vez al montar el componente

  return (
    <div className="container-xl">
    <div className="notification">
      <div className="notiglow"></div>
      <div className="notiborderglow"></div>
      <div className="notititle">Catalogo LML</div>
      <div className="notibody">
        <div className="cards-container">
          <Link to="/categorias">
            <button-lml>Categorías</button-lml>
          </Link>
          <Link to="/enlaces">
            <button-lml>Enlaces</button-lml>
          </Link>
          
        </div>

        <div>
          <div className="container">
            <h1>Noticias de Tecnología</h1>
          </div>

          {loading ? (
            <p>Cargando noticias...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="cards-container-news">
              {noticias.map((noticia, index) => (
                <div className="card-news" key={index}>
                  {noticia.urlToImage && (
                    <img
                      src={noticia.urlToImage}
                      alt={noticia.title}
                      className="card-image-news"
                    />
                  )}
                  <div className="card-content-news">
                    <p className="heading-news">{noticia.title}</p>
                    <p>
                      <strong>Autor:</strong> {noticia.author || "Desconocido"}
                    </p>
                    <p>
                      <strong>Fuente:</strong>{" "}
                      <a
                        href={noticia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {noticia.url}
                      </a>
                    </p>
                    <p>
                      <strong>Descripción:</strong> {noticia.description}
                    </p>
                    {noticia.content &&
                      noticia.content !== noticia.description && (
                        <p>
                          <strong>Contenido:</strong> {noticia.content}
                        </p>
                      )}
                    <p>
                      <strong>Publicado el:</strong>{" "}
                      {new Date(noticia.publishedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
