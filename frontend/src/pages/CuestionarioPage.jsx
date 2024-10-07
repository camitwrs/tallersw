import React from "react";
import { Link } from "react-router-dom";
import Lista_de_Preguntas from "../components/ListarPreguntas";
import Lista_de_DatosPersonales from "../components/ListatDatosPersonales";
import Lista_de_PreguntasA4 from "../components/ListarPreguntasA4";

const CuestionarioPage = () => {
  // Definir la clave que quieres pasar (puede ser dinámica o estática)

  function tablaD() {
    const filas = []; // Arreglo para almacenar los componentes

    for (let i = 0; i < 24 - 7 + 1; i++) {
      const clave = `D${i + 7}`; // Generar la clave D7, D8, ..., D24
      filas.push(<Lista_de_Preguntas key={clave} clave={clave} />); // Agregar el componente al arreglo
    }

    return <div>{filas}</div>; // Retornar un contenedor con todos los componentes
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Link to="/">
        <button className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver a Inicio
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-4">Cuestionario</h1>
      {/* Muestra la lista de preguntas y pasa la clave como prop */}
      <Lista_de_DatosPersonales />
      <br></br>
      <Lista_de_Preguntas clave={"A2"} />
      <br></br>
      <Lista_de_Preguntas clave={"A3"} />
      <br></br>
      <Lista_de_PreguntasA4 clave={"A4"} />
      <br></br>
      <Lista_de_Preguntas clave={"B1"} />
      <br></br>
      <Lista_de_Preguntas clave={"B2"} />
      <br></br>
      <Lista_de_Preguntas clave={"B3"} />
      <br></br>
      <Lista_de_Preguntas clave={"B4"} />
      {/* <br></br>
      <Lista_de_Preguntas clave={"B5"} /> */}
      <br></br>
      <Lista_de_Preguntas clave={"D1"} />
      <br></br>
      <Lista_de_Preguntas clave={"D2"} />
      <br></br>
      <Lista_de_Preguntas clave={"D3"} />
      <br></br>
      <Lista_de_Preguntas clave={"D4"} />
      <br></br>
      <Lista_de_Preguntas clave={"D5"} />
      <br></br>
      <Lista_de_Preguntas clave={"D6"} />
      <br></br>
      {tablaD()}
    </div>
  );
};

export default CuestionarioPage;
