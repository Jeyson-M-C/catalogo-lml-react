import React, { useState } from 'react';

function CrearSuperAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/superadmin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error(`Error al crear el superadministrador`);

      const data = await response.json();
      setSuccessMessage(data.mensaje);
      
      // Limpiar campos.
      setUsername('');
      setPassword('');
      
      // Limpiar errores previos.
      setError(null); 
      
    } catch (error) {
      console.error(error);
      setError(error.message);
      setSuccessMessage(null); 
    }
  };

  return (
  	<form onSubmit={handleSubmit}>
  	 	<label>Nombre de Usuario:</label>
  	 	<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
  	 	
  	 	<label>Contraseña:</label>
  	 	<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  	 	
  	 	<button type="submit">Crear Superadministrador</button>

  	 	{error && <div className="error">{error}</div>}
  	 	{successMessage && <div className="success">{successMessage}</div>}
  	</form>
	);
}

export default CrearSuperAdmin;
