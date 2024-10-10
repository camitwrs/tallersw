import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionD() {
  const { setStep, userData, setUserData, submitData } =
    useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({}); // Para almacenar las selecciones

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const claves = Array.from({ length: 29 }, (_, i) => `D${i + 1}`); // Genera claves de D1 a D29
      const respuestas = await Promise.all(
        claves.map((clave) => fetch(`http://localhost:4000/preguntas/${clave}`))
      );

      const datos = await Promise.all(respuestas.map((res) => res.json()));
      const preguntasCombinadas = datos.flat(); // Usa flat para aplanar el array
      setPreguntas(preguntasCombinadas); // Almacenar los datos en el estado
      console.log(preguntasCombinadas);
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
          ITEM D: CARACTERIZACIÓN DE FORMADORES EN EMPRENDIMIENTO
        </h1>

        <hr className="border-t-2 border-gray-200 mb-4" />

        <div className="flex flex-col items-center">
          {Object.entries(agrupadasPorPregunta)
            .filter(([idPregunta]) => idPregunta >= 38 && idPregunta <= 67)
            .map(([idPregunta, { textoPregunta, alternativas }]) => (
              <div key={idPregunta} className="mb-4 w-full text-center">
                <h1 className="text-lg font-semibold mb-2 text-center">
                  {textoPregunta}
                </h1>

                {/* Caso especial para la pregunta con idPregunta 44 */}
                {parseInt(idPregunta) === 44
                  ? alternativas.map((textoAlternativa, index) => (
                      <div key={index} className="mb-3">
                        <label className="block text-gray-700">
                          {textoAlternativa}
                        </label>
                        <select
                          value={selectedValues[idPregunta] || ""}
                          onChange={(e) =>
                            handleSelectChange(idPregunta, e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="" disabled>
                            Selecciona un valor
                          </option>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))
                  : /* Para todas las demás preguntas (radios) */
                    alternativas.map((textoAlternativa, index) => (
                      <div key={index} className="flex items-center mb-3">
                        <input
                          type="radio"
                          name={`pregunta-${idPregunta}`}
                          value={textoAlternativa}
                          checked={
                            selectedValues[idPregunta] === textoAlternativa
                          }
                          onChange={(e) =>
                            handleSelectChange(idPregunta, e.target.value)
                          }
                          className="mr-2"
                        />
                        <label className="text-gray-700">
                          {textoAlternativa}
                        </label>
                      </div>
                    ))}
              </div>
            ))}
        </div>

        <button
          onClick={() => setStep(4)}
          className="w-full bg-red-700 text-white py-1 rounded-full hover:bg-red-500 text-sm mb-2"
        >
          Atrás
        </button>

        <button
          onClick={submitData}
          className="w-full bg-cyan-800 text-white py-1 rounded-full hover:bg-cyan-600 text-sm"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
