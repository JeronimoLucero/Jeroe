import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { useAuth } from '../context/AuthContext'; // Si es necesario para gestionar el registro

const RegisterPage = () => {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la contraseña
  const [error, setError] = useState(''); // Para mostrar mensajes de error

  const navigate = useNavigate();
  const { login } = useAuth(); // Si deseas hacer login inmediatamente después del registro

  // Lógica de manejo del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Simular un registro exitoso (en un caso real, llamarías a tu backend)
    const newUser = { email, password };
    console.log('Usuario registrado:', newUser);

    // Si el registro fue exitoso, hacer login
    login(email, password); // Esto puede cambiar si manejas el login de manera diferente

    // Redirigir al perfil o a la página de inicio después del registro
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl mb-4">Registrarse</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {/* Campo de correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Campo de confirmación de contraseña */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Registrarse
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
