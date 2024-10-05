// src/pages/CuestionarioPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const CuestionarioPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link to="/">
        <button className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver a Inicio
        </button>
      </Link>

      <h1 className="text-3xl font-bold">Cuestionario</h1>
    </div>
  );
};

export default CuestionarioPage;
