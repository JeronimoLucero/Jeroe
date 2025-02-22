import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const {VITE_API_URL} = import.meta.env;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Accedemos al contexto de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    if (!username) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }
  
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${VITE_API_URL}/api/auth/register`, {
        username,
        email,
        password
      });
      
      console.log('Usuario registrado:', response.data);

      // Guardar el token y redirigir
      login(response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      setError(error.response?.data?.message || 'Hubo un error al registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl mb-4">Registrarse</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿Ya tienes cuenta? <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
      </p>
    </div>
  );
};

export default RegisterPage;
