import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, favorites, removeFavorite } = useAuth();

  if (!user) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" />;
  }

  const handleRemoveFavorite = (productId) => {
    removeFavorite(productId);
  };

  return (
    <div className="min-h-screen p-6">
      <h2>Bienvenido, {user.email}</h2>
      <p>Este es tu perfil.</p>

      <h3 className="text-2xl mt-8 mb-4">Tus Favoritos</h3>
      <div>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="flex justify-between items-center mb-2">
              <span>{fav.title}</span>
              <button
                onClick={() => handleRemoveFavorite(fav.id)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No tienes favoritos aún.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
