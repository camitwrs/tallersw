import React, { useEffect, useState } from "react";
import { data, textoFinal } from "./funcionesPrueba/tetoPrompt";
import { agregarPersona_profesor } from "./POST/POSTpersona";
import { agregarPersona_educador } from "./POST/POSTeducador";
import { agregarRespuestaParaProfesor } from "./POST/POSTrespuestas";
import ballena from "./funcionesPrueba/imagenes/Ilustración-cetaceo.svg";
import nutria from "./funcionesPrueba/imagenes/tración-mustelido.svg";
import orca from "./funcionesPrueba/imagenes/tración-orca.svg";
import pingu from "./funcionesPrueba/imagenes/tración-pinguino.svg";
import foca from "./funcionesPrueba/imagenes/tración-pinípedo.svg";
import tortu from "./funcionesPrueba/imagenes/tración-tortuga.svg";

function Pruebas() {
  const [resultados, setResultados] = useState([]);
  const [textos, setTextos] = useState({
    originalText: "",
    fantasyText: "",
    morphology: "",
  });

  const [statusMessage, setStatusMessage] = useState(""); // Estado para el mensaje de estado

  const [filas, setFilas] = useState(0);

  const fetchFilas = async () => {
    try {
      const response = await fetch("http://localhost:4000/cantidad_personas");

      if (!response.ok) {
        throw new Error("Error al obtener la cantidad de filas");
      }

      const data = await response.json();

      // Asignamos el valor de la cantidad de filas al estado
      setFilas(data.cantidad);
    } catch (error) {
      console.error("Error en fetchFilas:", error);
    }
  };

  // Llamamos a la función fetchFilas cuando el componente se monta
  useEffect(() => {
    fetchFilas();
  }, []);

  const fetchAlternativas = async () => {
    try {
      // Fetch alternativas data
      const response = await fetch("http://localhost:4000/alternativas");
      const alternativas = await response.json();

      // Assuming jsonData is available or fetched from another source
      const jsonData = data[0]; // Replace with your actual JSON data source if needed

      // Iterate through each key-value pair in jsonData
      const resultadosProcesados = Object.entries(jsonData).map(
        ([key, value]) => {
          // Exclude keys 3 and 26
          if (key === "3" || key === "26") {
            return { clave: key, valor: value }; // Return the original value for excluded keys
          }

          if (Array.isArray(value)) {
            // If the value is an array, process each element
            const valoresProcesados = value.map((id) => {
              const alternativa = alternativas.find(
                (alt) => alt.idAlternativa === id
              );
              if (alternativa) {
                return alternativa.caracteristica === null
                  ? alternativa.textoAlternativa
                  : alternativa.caracteristica;
              }
              // If no match is found, return the original ID
              return id;
            });

            return { clave: key, valor: valoresProcesados }; // Use the processed array as the valor
          } else {
            // Check if value exists in alternativas as idAlternativa
            const alternativa = alternativas.find(
              (alt) => alt.idAlternativa === value
            );

            if (alternativa) {
              // If alternativa is found and caracteristica is null, use textoAlternativa
              const valor =
                alternativa.caracteristica === null
                  ? alternativa.textoAlternativa
                  : alternativa.caracteristica;

              return { clave: key, valor: valor }; // Use the correct valor
            }
            // If no match is found, return the original value
            return { clave: key, valor: value };
          }
        }
      );

      setResultados(resultadosProcesados); // Update the state with processed results

      // Generate the texts using textoFinal
      const generatedTextos = textoFinal(resultadosProcesados);
      setTextos(generatedTextos);
    } catch (error) {
      console.error("Error al obtener alternativas:", error); // Handle errors
    }
  };

  useEffect(() => {
    fetchAlternativas();
    // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  // Handler para ejecutar agregarPersona_profesor y mostrar el estado
  const handleAgregarProfesor = async () => {
    try {
      // Primero obtenemos el número de filas actual
      await fetchFilas();

      // Calculamos el nuevo idpersona
      const nuevoIdPersona = parseInt(filas + 1);

      // Llamamos a la función para agregar un profesor
      await agregarPersona_profesor(nuevoIdPersona, resultados);

      // Luego vinculamos al profesor como educadorc

      await agregarPersona_educador(nuevoIdPersona, resultados);
      console.log(resultados);
      await agregarRespuestaParaProfesor(nuevoIdPersona, resultados);

      // Actualizamos el estado con un mensaje de éxito
      setStatusMessage(
        `Profesor y educador agregados con éxito: ID ${nuevoIdPersona}`
      );
    } catch (error) {
      // Manejamos cualquier error
      setStatusMessage(`Error al agregar profesor: ${error.message}`);
    }
  };

  function buscargenero() {
    if (textos.morphology == "Ballenas") return ballena;
    if (textos.morphology == "Focas") return foca;
    if (textos.morphology == "Tortuga marinas") return tortu;
    if (textos.morphology == "Orcas") return orca;
    if (textos.morphology == "Pingüinos") return pingu;
    if (textos.morphology == "Nutrias") return nutria;
    else return 0;
  }

  return (
    <div className="flex">
      {/* Resultados Procesados Table */}
      <div className="w-1/2 p-4">
        <h1>Resultados Procesados</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <tr key={index}>
                <td>{resultado.clave}</td>
                <td>{resultado.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Descripciones Generadas */}
      <div className="w-1/2 p-4">
        <h2>Descripción escrita:</h2>

        <h3>Texto Original:</h3>
        <pre className="whitespace-pre-wrap break-words overflow-auto">
          {textos.originalText}
        </pre>

        <h3>Texto de Fantasía:</h3>
        <pre className="whitespace-pre-wrap break-words overflow-auto">
          {textos.fantasyText}
        </pre>
        <div>
          {textos.morphology && (
            <img src={buscargenero()} alt={`Ilustración de `} />
          )}
        </div>

        {/* Botón para agregar profesor */}
        <button
          onClick={handleAgregarProfesor}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Profesor
        </button>

        {/* Mensaje de estado */}
        {statusMessage && (
          <p className="mt-4 text-sm">
            <strong>Estado:</strong> {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Pruebas;
