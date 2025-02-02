import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Usamos el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Usamos el hook para redirigir

const AdminPage = () => {
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  const navigate = useNavigate();
  
  // Si el usuario no es administrador, redirigirlo a otra página (por ejemplo, a su perfil)
  if (!user || user.role !== 'admin') {
    navigate('/profile'); // Redirigir si no es admin
    return null; // No renderizar nada si no es admin
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePublish = () => {
    // Lógica para subir una publicación
    console.log('Publicación subida:', { title, description, imageUrl });
    // Aquí podrías hacer una llamada a la API para subir la publicación
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl mb-4">Panel de Administración</h2>
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de Imagen</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="button"
          onClick={handlePublish}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
