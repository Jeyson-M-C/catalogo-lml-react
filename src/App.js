import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Categorias from './components/Categorias/Categorias';
import Enlaces from './components/Enlaces/Enlaces';
import EnlaceForm from './components/Enlaces/EnlaceForm';
import CategoriaForm from './components/Categorias/CategoriaForm'
import EnlacesPorCategoria from './components/Enlaces/EnlacesPorCategoria';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/enlaces" element={<Enlaces />} />
        <Route path="/enlaces-form" element={<EnlaceForm />} />
        <Route path="/categorias-form" element={<CategoriaForm />} />
        <Route path="/enlaces/:categoriaId" element={<EnlacesPorCategoria />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
