// src/context/ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const ProductContext = createContext();

// Crear el proveedor del contexto
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí podrías hacer una solicitud HTTP para obtener los productos
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Aquí pondrías tu URL de API
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook para acceder al contexto
export const useProducts = () => useContext(ProductContext);
