import React, { useState, useEffect } from "react";

export default function Lista_de_DatosPersonales() {
  // Estado para almacenar las preguntas
  const [preguntas, setPreguntas] = useState([]);

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const response = await fetch(`http://localhost:4000/preguntas`);
      const data = await response.json();

      // Filtrar preguntas con categoría 'A1'
      const preguntasA1 = data.filter(
        (pregunta) => pregunta.categoria === "A1"
      );
      setPreguntas(preguntasA1); // Almacenar las preguntas filtradas en el estado
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  };

  // useEffect para ejecutar cargarPreguntas al montar el componente
  useEffect(() => {
    cargarPreguntas(); // Invoca la función cargarPreguntas al montar el componente
  }, []); // Sin dependencias, se ejecuta solo una vez

  return (
    <div>
      {preguntas.length > 0 ? (
        <>
          <h1 className="text-xl font-bold mb-4">DATOS PERSONALES</h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Preguntas</th>
                <th className="border border-gray-300 px-4 py-2">Respuestas</th>
              </tr>
            </thead>
            <tbody>
              {preguntas.map((pregunta) => (
                <tr key={pregunta.idPregunta}>
                  <td className="border border-gray-300 px-4 py-2">
                    {pregunta.textoPregunta}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* Aquí puedes agregar la lógica para mostrar respuestas si está disponible */}
                    <input
                      type="text"
                      placeholder="Respuesta"
                      className="border border-gray-300 p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
    </div>
  );
}
