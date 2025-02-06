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
            if (data.is_admin || data.is_default_admin) {
                login(); // Actualiza el estado de autenticación y establece el temporizador
                alert('Inicio de sesión exitoso');
                navigate('/'); // Redirige a la página de inicio
            } else {
                alert('No tienes permisos para acceder');
            }
        } catch (error) {
            alert('Error al iniciar sesión usuario o contraseña erronea');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label mt-4">Iniciar sesión</label>
                <div className="form-floating mb-3">
                  <input 
                      type="username" 
                      class="form-control" 
                      id="floatingInput" 
                      placeholder="Usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} 
                  />
                  <label for="floatingInput">Usuario</label>
                </div>
                <div className="form-floating">
                  <input 
                      type="password" 
                      class="form-control" 
                      id="floatingPassword" 
                      placeholder="Contraseña" 
                      autocomplete="off"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                  />
                  <label for="floatingPassword">Contraseña</label>
                </div>
                <div>
                <button type="submit" class="btn btn-outline-success">Ingresar</button>
                </div>

            </div>
        </form>
    );
};

export default Login;
