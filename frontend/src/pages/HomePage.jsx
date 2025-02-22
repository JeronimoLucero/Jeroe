import React from 'react';


import { Link } from 'react-router-dom'; 

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col flex-grow">
       
        <main className="flex-grow flex items-center justify-center bg-[url('dist/assets/background.jpeg')] bg-opacity-10 bg-cover bg-center p-6">
          <div className="text-center flex flex-col items-between">
            <img
              src="src/assets/img/logomain.png"
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
