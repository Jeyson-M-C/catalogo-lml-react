import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    fetchEnlaces,
    fetchCategorias,
    fetchSubenlacesPorEnlace,
} from '../../services/api';
import SearchResults from './SearchResults'; // Importar el nuevo componente

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [enlaces, setEnlaces] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subenlaces, setSubenlaces] = useState([]);
    const [filteredEnlaces, setFilteredEnlaces] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [filteredSubenlaces, setFilteredSubenlaces] = useState([]);

    // Cargar datos al montar el componente
    useEffect(() => {
        const loadData = async () => {
            try {
                const enlacesData = await fetchEnlaces();
                const categoriasData = await fetchCategorias();
                setEnlaces(enlacesData);
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        loadData();
    }, []);

    // Manejar el cambio en el input de búsqueda
    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredEnlaces([]);
            setFilteredCategorias([]);
            setFilteredSubenlaces([]);
            return;
        }

        // Filtrar enlaces y categorías según el término de búsqueda
        setFilteredEnlaces(
            enlaces.filter((enlace) =>
                enlace.titulo.toLowerCase().includes(term.toLowerCase()) ||
                enlace.descripcion.toLowerCase().includes(term.toLowerCase())
            )
        );

        setFilteredCategorias(
            categorias.filter((categoria) =>
                categoria.nombre.toLowerCase().includes(term.toLowerCase())
            )
        );

        try {
            const subenlaceData = await Promise.all(
                enlaces.map((enlace) =>
                    fetchSubenlacesPorEnlace(enlace._id).then((data) =>
                        data.subenlaces.filter((sub) =>
                            sub.titulo.toLowerCase().includes(term.toLowerCase())
                        )
                    )
                )
            );
            setFilteredSubenlaces(subenlaceData.flat());
        } catch (error) {
            console.error('Error al cargar subenlaces:', error);
        }
    };

    return (
        <>
            {/* Navbar */}
            <div className="nav">
                <div className="container-nav">
                    <Link to="/">
                        <button className="btn-nav">Inicio</button>
                    </Link>
                    <Link to="/categorias">
                        <button className="btn-nav">Categorías</button>
                    </Link>
                    <Link to="/enlaces">
                        <button className="btn-nav">Enlaces</button>
                    </Link>
                    {isAuthenticated && (
                    <>
                        <Link to="/categorias-form">
                            <button className="btn-nav">Crear Categoría</button>
                        </Link>
                        <Link to="/enlaces-form">
                            <button className="btn-nav">Crear Enlace</button>
                        </Link>
                    </>
                    )}

                    {/* Input de búsqueda */}
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                        // Sanitizar el input para evitar XSS
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                        }}
                    />
                </div>
            </div>

            {/* Resultados de la búsqueda */}
            {searchTerm && (
                <SearchResults
                    enlaces={filteredEnlaces}
                    categorias={filteredCategorias}
                    subenlaces={filteredSubenlaces}
                    isAuthenticated={isAuthenticated}
                />
            )}
        </>
    );
};

export default Navbar;