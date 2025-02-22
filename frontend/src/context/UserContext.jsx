import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Nuevo estado para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token está en el almacenamiento local
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        const parts = storedToken.split('.');
        if (parts.length === 3) {
          const decodedUser = JSON.parse(atob(parts[1])); // Decodificamos el payload del token

          // Verificamos la expiración del token
          const isExpired = decodedUser.exp * 1000 < Date.now();
          if (isExpired) {
            localStorage.removeItem('token');
            setLoading(false);
            setError('El token ha expirado. Por favor, inicia sesión nuevamente.');
          } else {
            setUser(decodedUser);
            setLoading(false);
          }
        } else {
          console.error('Formato de token inválido');
          localStorage.removeItem('token');
          setLoading(false);
          setError('Token inválido.');
        }
      } catch (err) {
        console.error('Error decodificando el token:', err);
        localStorage.removeItem('token');
        setLoading(false);
        setError('Error al leer el token.');
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Guardamos el token en localStorage
    navigate('/profile'); // Redirigir al perfil u otra página después del login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Eliminamos el token
    navigate('/'); // Redirigir al inicio
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => useContext(UserContext);
