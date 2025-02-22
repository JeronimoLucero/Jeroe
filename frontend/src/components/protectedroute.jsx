// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, role = null }) => {
  const { user, token } = useAuth(); // Access user and token from context

  if (!token) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Redirect to profile or home page if the user is not authorized (based on role)
    return <Navigate to="/profile" />;
  }

  return element; // Render the protected route if everything is fine
};

export default ProtectedRoute;
