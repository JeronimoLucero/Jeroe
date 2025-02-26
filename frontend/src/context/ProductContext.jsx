
import React, { createContext, useContext, useState, useEffect } from 'react';
const {VITE_API_URL} = import.meta.env;

const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/products`); 
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

export const useProducts = () => useContext(ProductContext);
