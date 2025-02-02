import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  // Estado del usuario (null si no está autenticado)
  const [user, setUser] = useState(null);
  
  // Estado de los favoritos del usuario
  const [favorites, setFavorites] = useState([]);

  // Función para iniciar sesión
  const login = (email, role = 'user') => {
    // Simulamos que el usuario se autentica con su email y rol
    const loggedInUser = { email, role };
    setUser(loggedInUser);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Limpiar el usuario al cerrar sesión
    setFavorites([]); // Limpiar los favoritos
  };

  // Función para agregar un producto a favoritos
  const addFavorite = (product) => {
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Función para eliminar un producto de favoritos
  const removeFavorite = (productId) => {
    setFavorites(favorites.filter(fav => fav.id !== productId));
  };

  // Valor del contexto que contiene el estado y las funciones necesarias
  const value = {
    user,
    login,
    logout,
    favorites,
    addFavorite,
    removeFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
