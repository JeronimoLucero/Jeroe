import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Suponiendo que tienes un contexto de autenticación
const {VITE_API_URL} = import.meta.env;

const StorePage = () => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addCartMessage, setAddCartMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Estado para el formulario de edición
  const [editProduct, setEditProduct] = useState(null); // El producto que estamos editando

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setAddCartMessage(`${product.nombre} agregado al carrito.`);
    setTimeout(() => setAddCartMessage(''), 3000);
  };

  const handleDeleteProduct = async (productId) => {
    if (!token) {
      alert('No estás autorizado para eliminar productos');
      return;
    }

    try {
      const response = await fetch(`${VITE_API_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar producto');
      }

      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      alert(error.message);
    }
  };

  // Función para mostrar el formulario de edición
  const handleEditProduct = (product) => {
    setEditProduct({ ...product });
    setIsEditing(true); // Mostrar el formulario de edición
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!token) {
      alert("No estás autorizado para editar productos");
      return;
    }

    try {
      const response = await fetch(`${VITE_API_URL}/api/products/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProduct),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar producto');
      }

      // Actualizar el producto en el estado
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id ? { ...product, ...editProduct } : product
        )
      );

      setIsEditing(false); // Cerrar el formulario de edición
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-4 text-center">Tienda</h2>

      {addCartMessage && (
        <div className="bg-green-500 text-white p-2 mb-4 rounded">{addCartMessage}</div>
      )}

      {/* Formulario de edición */}
      {isEditing && (
        <div className="bg-white p-4 shadow-lg mb-4">
          <h3 className="text-xl">Editar Producto</h3>
          <input
            type="text"
            name="nombre"
            value={editProduct.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="w-full mb-2 p-2"
          />
          <input
            type="text"
            name="descripcion"
            value={editProduct.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full mb-2 p-2"
          />
          <input
            type="number"
            name="precio"
            value={editProduct.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="w-full mb-2 p-2"
          />
          <input
            type="text"
            name="urlimagen"
            value={editProduct.urlimagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
            className="w-full mb-2 p-2"
          />
          <button onClick={handleSaveChanges} className="bg-blue-500 text-white p-2 rounded">
            Guardar Cambios
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded ml-2">
            Cancelar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-3 text-center shadow-md hover:shadow-sm relative">
            <img
              src={product.urlimagen}
              alt={product.nombre}
              className="w-full h-72 object-contain rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold">{product.nombre}</h3>
            <p className="text-gray-700 mb-4">{product.descripcion}</p>
            <h4>${product.precio}</h4>

            <button
              onClick={() => handleAddToCart(product)}
              className="text-gray-500 py-2 px-4 rounded-md hover:text-green-600"
            >
              <FaShoppingCart size={24} />
            </button>

            {/* Mostrar el botón de editar y eliminar solo si es admin */}
            {user && user.role === 'admin' && (
              <div>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="absolute top-2 left-2 bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
