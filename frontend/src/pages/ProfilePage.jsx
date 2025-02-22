import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Usar el contexto de autenticación
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth(); // Obtener el usuario del contexto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-800">Tu Perfil</h1>
      <p className="mt-2 text-gray-600"></p>

      <div className="mt-6">
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
