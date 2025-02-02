import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtenemos el estado del usuario y la función logout

  return (
    <nav className="p-4 bg-black text-white">
      <ul className="flex justify-end space-x-4">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/store">Tienda</Link></li>

        {/* Ternarias para mostrar enlaces dependiendo del estado de autenticación */}
        {!user ? (
          <>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile">Perfil</Link></li>

            {/* Solo el admin ve el enlace para administrar la tienda */}
            {user.role === 'admin' && (
              <li><Link to="/admin">Administrar Tienda</Link></li>
            )}

            {/* Botón de cerrar sesión */}
            <li>
              <button onClick={logout} className="text-red-500">
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
