import React, { useState, useEffect } from "react";

export default function Lista_de_Preguntas({ clave }) {
  // Estado para almacenar las preguntas
  const [preguntas, setPreguntas] = useState([]);

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const response = await fetch(`http://localhost:4000/preguntas/${clave}`);
      const data = await response.json();
      setPreguntas(data); // Almacenar los datos en el estado
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
        <>
          <h1 className="text-xl font-bold mb-4">
            {preguntas[0].textoPregunta}
          </h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Alternativas
                </th>
                <th className="border border-gray-300 px-4 py-2">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {preguntas.map((pregunta) => (
                <tr key={pregunta.idPregunta}>
                  <td className="border border-gray-300 px-4 py-2">
                    {pregunta.textoAlternativa}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" />
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
