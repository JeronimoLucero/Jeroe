
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-8">¡Oops! La página que buscas no existe.</p>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
      >
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFoundPage;
