import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Use named import
import { useNavigate } from 'react-router-dom';
const {VITE_API_URL} = import.meta.env;

const AdminPage = () => {
  const { user, token } = useAuth();  // Get user and token from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/profile');  // Redirect if not admin
    }
  }, [user, navigate]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [urlimagen, setUrlimagen] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddProduct = async () => {
    setError('');
    setSuccess('');
  
    // Verificar si el token está disponible
    if (!token) {
      setError('No se encontró el token de autenticación');
      return;
    }
  
    try {
      const response = await fetch(`${VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Incluir el token en los encabezados
        },
        body: JSON.stringify({ nombre, descripcion, precio, urlimagen }), // Cambiado los campos
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al agregar producto');
      }
  
      setSuccess('Producto agregado con éxito');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setUrlimagen('');
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl mb-4">Panel de Administración</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="urlimagen" className="block text-sm font-medium text-gray-700">URL de Imagen</label>
          <input
            type="text"
            id="urlimagen"
            value={urlimagen}
            onChange={(e) => setUrlimagen(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleAddProduct}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
