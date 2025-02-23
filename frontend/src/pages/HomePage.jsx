import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../public/img/background.jpeg'; // Ajusta la ruta según tu estructura de carpetas

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col flex-grow">
        <main
          className="flex-grow flex items-center justify-center bg-cover bg-center p-6"
          style={{ backgroundImage: `url(${background})` }} // Usa la imagen importada como fondo
        >
          <div className="text-center flex flex-col items-between">
            <img
              src="img/logomain.png" // Asegúrate de que esta ruta sea correcta
              alt="Logo"
              className="object-contain h-20 mx-auto drop-shadow-lg"
            />
            <div>
              <Link to="/store">
                <button className="bg-black text-white px-5 py-2 hover:bg-gray-400 transition mt-6">
                  Visitar Tienda
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;