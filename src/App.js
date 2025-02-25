import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/shared/Navbar';
import Login from './components/Auth/Login';
import Categorias from './components/Categorias/Categorias';
import CategoriaForm from './components/Categorias/CategoriaForm'
import Enlaces from './components/Enlaces/Enlaces';
import EnlaceForm from './components/Enlaces/EnlaceForm';
import EnlacesPorCategoria from './components/Enlaces/EnlacesPorCategoria';
import Subenlaces from './components/Subenlaces/Subenlaces';
import SubenlacesForm from './components/Subenlaces/SubenlacesForm';
import { AuthProvider } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/enlaces" element={<Enlaces />} />
        <Route path="/subenlaces/:enlaceId" element={<Subenlaces />} />
        <Route path="/enlaces-form" element={<EnlaceForm />} />
        <Route path="/subenlaces-form" element={<SubenlacesForm />} />
        <Route path="/categorias-form" element={<CategoriaForm />} />
        <Route path="/enlaces/:categoriaId" element={<EnlacesPorCategoria />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
