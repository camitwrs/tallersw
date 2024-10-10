import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionC() {
  const { setStep, userData, setUserData } = useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({}); // Para almacenar las selecciones

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const claves = Array.from({ length: 15 }, (_, i) => `C${i + 1}`); // Genera claves de C1 a C15
      const respuestas = await Promise.all(
        claves.map((clave) => fetch(`http://localhost:4000/preguntas/${clave}`))
      );

      const datos = await Promise.all(respuestas.map((res) => res.json()));
      const preguntasCombinadas = datos.flat(); // Usa flat para aplanar el array
      setPreguntas(preguntasCombinadas); // Almacenar los datos en el estado
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  };

  // useEffect para ejecutar cargarPreguntas al montar el componente
  useEffect(() => {
    cargarPreguntas();
  }, []); // Dependencia vacía para que se ejecute al montar

  // Inicializa selectedValues con userData al montar el componente
  useEffect(() => {
    const initialValues = preguntas.reduce((acc, pregunta) => {
      const { idPregunta } = pregunta;
      acc[idPregunta] = userData[idPregunta] || ""; // Asigna el valor del usuario o una cadena vacía
      return acc;
    }, {});
    setSelectedValues(initialValues);
  }, [userData, preguntas]); // Se ejecuta cada vez que userData o preguntas cambian

  // Agrupa las alternativas por idPregunta
  const agrupadasPorPregunta = preguntas.reduce((acc, pregunta) => {
    const { idPregunta, textoPregunta, textoAlternativa } = pregunta;
    if (!acc[idPregunta]) {
      acc[idPregunta] = { textoPregunta, alternativas: [] };
    }
    acc[idPregunta].alternativas.push(textoAlternativa);
    return acc;
  }, {});

  const handleSelectChange = (idPregunta, value) => {
    // Actualiza selectedValues y userData en el contexto con el valor seleccionado
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [idPregunta]: value,
    }));

    setUserData((prevUserData) => ({
      ...prevUserData,
      [idPregunta]: value,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-4 bg-white shadow-md rounded-2xl">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-custom-blue">
          ITEM C: COMPETENCIAS EMPRENDEDORAS
        </h1>

        <hr className="border-t-2 border-gray-200 mb-4" />

        <h1 className="text-lg font-semibold mb-2 text-center">
          Evalúa en qué nivel de cada subcompetencia emprendedora te encuentras.
          Toma de referencia los descriptores de cada nivel (básico, medio y
          avanzado).
        </h1>

        <div className="flex flex-col items-center">
          {Object.entries(agrupadasPorPregunta).map(
            ([idPregunta, { textoPregunta, alternativas }]) => (
              <div key={idPregunta} className="mb-4 w-full text-center">
                <h1 className="text-lg font-semibold mb-2 text-center">
                  {textoPregunta}
                </h1>

                <div className="flex flex-col items-center space-y-1 mb-2">
                  {alternativas.map((textoAlternativa, index) => (
                    <label key={index} className="text-sm text-center">
                      {textoAlternativa}
                    </label>
                  ))}
                </div>

                <select
                  onChange={(e) =>
                    handleSelectChange(idPregunta, e.target.value)
                  }
                  className="border rounded p-1 text-md text-center"
                  value={selectedValues[idPregunta] || ""} // Utiliza el valor de selectedValues
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="Básico">Básico</option>
                  <option value="Medio">Medio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            )
          )}
        </div>

        <button
          onClick={() => setStep(3)}
          className="w-full bg-red-700 text-white py-1 rounded-full hover:bg-red-500 text-sm mb-2"
        >
          Atrás
        </button>

        <button
          onClick={() => setStep(5)}
          className="w-full bg-cyan-800 text-white py-1 rounded-full hover:bg-cyan-600 text-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
