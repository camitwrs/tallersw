import React, { useState, useEffect } from "react";

export default function Lista_de_PreguntasA4({ clave }) {
  // Estado para almacenar las preguntas
  const [preguntas, setPreguntas] = useState([]);

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const response = await fetch(`http://localhost:4000/preguntas/${clave}`);
      const data = await response.json();

      // Agrupar las alternativas bajo cada pregunta
      const preguntasAgrupadas = data.reduce((acc, curr) => {
        const preguntaExistente = acc.find(
          (p) => p.idPregunta === curr.idPregunta
        );
        if (preguntaExistente) {
          preguntaExistente.alternativas.push({
            idAlternativa: curr.idAlternativa,
            textoAlternativa: curr.textoAlternativa,
          });
        } else {
          acc.push({
            idPregunta: curr.idPregunta,
            textoPregunta: curr.textoPregunta,
            alternativas: [
              {
                idAlternativa: curr.idAlternativa,
                textoAlternativa: curr.textoAlternativa,
              },
            ],
          });
        }
        return acc;
      }, []);

      setPreguntas(preguntasAgrupadas); // Almacenar los datos agrupados en el estado
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  };

  // useEffect para ejecutar cargarPreguntas al montar el componente
  useEffect(() => {
    if (clave) {
      cargarPreguntas(); // Invoca la función cargarPreguntas solo si clave está presente
    }
  }, [clave]); // Dependencia clave, si cambia la clave se vuelve a ejecutar

  return (
    <div>
      {preguntas.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Pregunta</th>
              <th className="border border-gray-300 px-4 py-2">Alternativas</th>
              <th className="border border-gray-300 px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {preguntas.map((pregunta) => (
              <tr key={pregunta.idPregunta}>
                <td className="border border-gray-300 px-4 py-2">
                  {pregunta.textoPregunta}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pregunta.alternativas.map((alternativa) => (
                    <div key={alternativa.idAlternativa}>
                      {alternativa.textoAlternativa}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {pregunta.alternativas.map((alternativa) => (
                    <div key={alternativa.idAlternativa}>
                      <input type="checkbox" />{" "}
                      {/* Checkbox para cada alternativa */}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
    </div>
  );
}
