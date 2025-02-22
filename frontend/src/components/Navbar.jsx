import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Usar el contexto de autenticación

const Navbar = () => {
  const { user, loading, logout } = useAuth();  // Obtener el usuario y el estado de loading
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>;
  }

  const isHomePage = location.pathname === "/";

  return (
    <nav className="p-4 bg-black text-white">
      <div className="flex justify-between items-center">
        <div>
          {!isHomePage && (
            <img src="src/assets/img/logonav.png" alt="Logo" className="h-5" />
          )}
        </div>

        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
          <li><Link to="/store" className="hover:text-gray-400">Tienda</Link></li>

          {!user ? (
            <>
              <li><Link to="/login" className="hover:text-gray-400">Iniciar sesión</Link></li>
              <li><Link to="/register" className="hover:text-gray-400">Registrarse</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile" className="hover:text-gray-400">Perfil</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin" className="hover:text-gray-400">Administrar Tienda</Link></li>
              )}
              <li>
                <button onClick={logout} className="text-red-500 hover:text-red-400">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
