import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// AuthProvider Component to wrap the app
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');  // Manage token in context

  const login = (userData) => {
    setUser(userData.user);
    setToken(userData.token);
    localStorage.setItem('token', userData.token);  // Store token in localStorage
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');  // Clear token on logout
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to easily access context
const useAuth = () => useContext(AuthContext);

// **Default export for AuthProvider**
export default AuthProvider;

// Named export for useAuth hook
export { useAuth };
