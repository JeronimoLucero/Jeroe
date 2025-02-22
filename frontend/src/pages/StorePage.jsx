import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Icono de carrito
import { useAuth } from '../context/AuthContext'; // Suponiendo que tienes un contexto de autenticación

const StorePage = () => {
  const { user, token } = useAuth(); // Obtener usuario y token desde el contexto de autenticación
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de los productos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [addCartMessage, setAddCartMessage] = useState(''); // Estado para mostrar mensaje de carrito

  // Obtener productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Asegúrate que la URL sea correcta
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const data = await response.json(); // Asegurarnos de que el response sea convertido a JSON
        console.log('Productos recibidos:', data);  // Log para verificar los productos en consola
        setProducts(data); // Guardamos los productos en el estado
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError(error.message); // Manejamos el error si ocurre
      } finally {
        setLoading(false); // Finalizamos la carga
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que solo se haga la solicitud una vez al cargar el componente

  // Función para agregar productos al carrito (solo con mensaje, sin backend)
  const handleAddToCart = (product) => {
    setAddCartMessage(`${product.nombre} agregado al carrito.`);
    setTimeout(() => setAddCartMessage(''), 3000); // El mensaje se oculta después de 3 segundos
  };

  // Función para eliminar un producto
  const handleDeleteProduct = async (productId) => {
    if (!token) {
      alert("No estás autorizado para eliminar productos");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar producto');
      }

      // Eliminar el producto del estado
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert(error.message);
    }
  };

  // Si está cargando, mostramos un mensaje
  if (loading) {
    return <div className="flex justify-center items-center">Cargando productos...</div>;
  }

  // Si hubo un error, lo mostramos
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl mb-4 text-center">Tienda</h2>

      {/* Mensaje de estado para el carrito */}
      {addCartMessage && <div className="bg-green-500 text-white p-2 mb-4 rounded">{addCartMessage}</div>}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white p-3 text-center shadow-md hover:shadow-sm relative">
              <img src={product.urlimagen} alt={product.nombre} className="w-full h-72 object-contain rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{product.nombre}</h3>
              <p className="text-gray-700 mb-4">{product.descripcion}</p>
              <h4>${product.precio}</h4>

              {/* Botón de agregar al carrito */}
              <button
                onClick={() => handleAddToCart(product)}
                className="text-gray-500 py-2 px-4 rounded-md hover:text-green-600"
                aria-label={`Agregar ${product.nombre} al carrito`}
              >
                <FaShoppingCart size={24} />
              </button>

              {/* Mostrar el botón de eliminar solo si es admin */}
              {user && user.role === 'admin' && (
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">No hay productos disponibles</div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
