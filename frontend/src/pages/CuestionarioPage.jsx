import React from "react";
import { Link } from "react-router-dom";
import Lista_de_Preguntas from "../components/ListarPreguntas";
import Lista_de_DatosPersonales from "../components/ListatDatosPersonales";

const CuestionarioPage = () => {
  // Definir la clave que quieres pasar (puede ser dinámica o estática)

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link to="/">
        <button className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver a Inicio
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">Cuestionario</h1>

      {/* Muestra la lista de preguntas y pasa la clave como prop */}
      {/* <Lista_de_Preguntas clave={"A2"} /> */}
      <Lista_de_DatosPersonales />
    </div>
  );
};

export default CuestionarioPage;
