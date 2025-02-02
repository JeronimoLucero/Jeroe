import React from 'react';
import { useAuth } from '../context/AuthContext'; // Usamos el contexto de autenticación

const StorePage = () => {
  const { user, addFavorite } = useAuth(); // Obtenemos el usuario y la función para agregar favoritos

  // Productos de ejemplo (en un caso real, estos vendrían de una API)
  const products = [
    { id: 1, title: 'Producto 1', description: 'Descripción del producto 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Producto 2', description: 'Descripción del producto 2', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Producto 3', description: 'Descripción del producto 3', imageUrl: 'https://via.placeholder.com/150' },
  ];

  // Función para manejar el clic en "Agregar a Favoritos"
  const handleAddFavorite = (product) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar favoritos');
      return;
    }
    addFavorite(product);
    alert(`${product.title} agregado a tus favoritos.`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-4 text-center">Tienda</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
            <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <button
              onClick={() => handleAddFavorite(product)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Agregar a Favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
