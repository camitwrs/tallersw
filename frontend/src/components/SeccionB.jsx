import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionB() {
  const { setStep, userData, setUserData } = useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({}); // Almacena selecciones por idPregunta

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const claves = ["B1", "B1.2", "B2", "B3", "B4"]; // Claves que deseas consultar
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
    setSelectedValues(userData); // Cargar valores seleccionados del contexto
  }, []); // Dependencia vacía para que se ejecute al montar

  // Filtra las preguntas específicas que necesitas
  const preguntasFiltradas = preguntas.filter(
    (pregunta) => pregunta.idPregunta >= 1 // Ajusta el rango según tus necesidades
  );

  // Agrupa las alternativas por idPregunta
  const agrupadasPorPregunta = preguntasFiltradas.reduce((acc, pregunta) => {
    const { idPregunta, textoPregunta, textoAlternativa, idAlternativa } =
      pregunta;
    if (!acc[idPregunta]) {
      acc[idPregunta] = { textoPregunta, alternativas: [] };
    }
    acc[idPregunta].alternativas.push({ idAlternativa, textoAlternativa });
    return acc;
  }, {});

  const handleChange = (value, idAlternativa, idPregunta) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [idPregunta]: {
        ...(prevValues[idPregunta] || {}),
        [idAlternativa]: value,
      },
    }));

    // Actualiza userData en el contexto
    setUserData((prevUserData) => ({
      ...prevUserData,
      [idPregunta]: {
        ...(prevUserData[idPregunta] || {}),
        [idAlternativa]: value,
      },
    }));
  };

  const handleTextInputChange = (idPregunta, idAlternativa, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [idPregunta]: {
        ...(prevValues[idPregunta] || {}),
        [idAlternativa]: value,
      },
    }));

    // Actualiza userData en el contexto
    setUserData((prevUserData) => ({
      ...prevUserData,
      [idPregunta]: {
        ...(prevUserData[idPregunta] || {}),
        [idAlternativa]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-4 bg-white shadow-md rounded-2xl">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-cyan-600">
          ITEM B: CARACTERIZACIÓN DE LA EXPERIENCIA
        </h1>

        <hr className="border-t-2 border-cyan-500 mb-4" />

        {Object.entries(agrupadasPorPregunta).map(
          ([idPregunta, { textoPregunta, alternativas }]) => (
            <div key={idPregunta}>
              <h1 className="text-lg font-semibold mb-4 text-left">
                {textoPregunta}
              </h1>

              <div className="flex flex-col space-y-1 mb-4">
                {idPregunta === "22"
                  ? // Solo campos de texto para la pregunta con id 22
                    alternativas.map(({ idAlternativa, textoAlternativa }) => (
                      <div key={idAlternativa} className="flex items-center">
                        <label
                          htmlFor={`pregunta-${idAlternativa}`}
                          className="text-sm text-left mr-2"
                        >
                          {textoAlternativa}
                        </label>
                        <input
                          type="text"
                          id={`pregunta-${idAlternativa}`}
                          value={
                            selectedValues[idPregunta]?.[idAlternativa] || ""
                          }
                          onChange={(e) =>
                            handleTextInputChange(
                              idPregunta,
                              idAlternativa,
                              e.target.value
                            )
                          }
                          placeholder="Escriba su respuesta aquí"
                          className="border border-gray-300 rounded-md p-1 mt-2 w-1/2"
                        />
                      </div>
                    ))
                  : // Radio buttons para las otras preguntas
                    alternativas.map(({ idAlternativa, textoAlternativa }) => (
                      <div key={idAlternativa} className="flex items-center">
                        <input
                          type="radio"
                          id={`pregunta-${idAlternativa}`}
                          value={textoAlternativa}
                          checked={
                            selectedValues[idPregunta]?.[idAlternativa] ===
                            textoAlternativa
                          }
                          onChange={() =>
                            handleChange(
                              textoAlternativa,
                              idAlternativa,
                              idPregunta
                            )
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor={`pregunta-${idAlternativa}`}
                          className="text-sm text-left"
                        >
                          {textoAlternativa}
                        </label>
                      </div>
                    ))}
              </div>
            </div>
          )
        )}

        <button
          onClick={() => setStep(2)}
          className="w-full bg-red-700 text-white py-1 rounded-full hover:bg-red-500 text-sm mb-2"
        >
          Atrás
        </button>

        <button
          onClick={() => {
            setStep(4);
          }}
          className="w-full bg-cyan-800 text-white py-1 rounded-full hover:bg-cyan-600 text-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
