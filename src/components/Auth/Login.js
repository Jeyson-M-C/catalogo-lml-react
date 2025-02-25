import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(username, password);
            if (data['is-admin']) {
                login(); // Actualiza el estado de autenticación y establece el temporizador
                alert('Inicio de sesión exitoso');
                navigate('/'); // Redirige a la página de inicio
            } else {
                alert('No tienes permisos para acceder');
            }
        } catch (error) {
          if(error.response && error.response.status === 401){
            alert('Credenciales inválidas');
          } else if(error.response && error.response.status === 405){
            console.log("Error Method Not Allowed");
            alert('Método no permitido');
          } else {
            alert('Error al iniciar sesión: ' + error.message);
        }        
      }
    };

    return (
      <div className="container-xl">
        <div className="container-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <p className="title-login">Acceso</p>
        <input
          placeholder="Usuario"
          className="username input-login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Contraseña"
          className="password input-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn-login" type="submit">
          Ingresar
        </button>
      </form>
        </div>
      </div>
  );
};

export default Login;
