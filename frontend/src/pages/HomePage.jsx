import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen font-sans bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold">WILD-E</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center p-4">
        <p className="text-xl text-gray-700 mb-4">
          Los Educadores de Emprendimiento son Mamíferos Marinos.
        </p>
        <p className="text-lg text-gray-600">
          Descubre tu perfil educativo aquí abajo:
        </p>

        <Link to="/cuestionario">
          <button className="mt-8 bg-white text-blue-500 font-bold py-2 px-4 rounded border border-blue-500 hover:bg-blue-500 hover:text-white">
            Haz el cuestionario aquí
          </button>
        </Link>
      </main>

      <footer className="w-full text-center py-4 bg-gray-200 text-gray-600 text-sm">
        <p>&copy; 2024 JCBG Team. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
