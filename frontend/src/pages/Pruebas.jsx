import React, { useEffect, useState } from "react";
import { data, textoFinal } from "./funcionesPrueba/tetoPrompt";

function Pruebas() {
  const [resultados, setResultados] = useState([]);
  const [textos, setTextos] = useState({ originalText: "", fantasyText: "" });

  useEffect(() => {
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
        );

        setResultados(resultadosProcesados); // Update the state with processed results

        // Generate the texts using textoFinal
        const generatedTextos = textoFinal(resultadosProcesados);
        setTextos(generatedTextos);
      } catch (error) {
        console.error("Error al obtener alternativas:", error); // Handle errors
      }
    };

    fetchAlternativas(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

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
        <pre className="whitespace-pre-wrap break-words overflow-auto"></pre>
      </div>
    </div>
  );
}

export default Pruebas;
