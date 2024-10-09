import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionA() {
  const { setStep, userData, setUserData } = useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({}); // Cambiado a un objeto para almacenar selecciones por idPregunta

  // Función para cargar las preguntas desde la API
  const cargarPreguntas = async () => {
    try {
      const claves = ["A2", "A3", "A4"]; // Claves que deseas consultar
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

  // Filtra las preguntas con idPregunta entre 7 y 17
  const preguntasFiltradas = preguntas.filter(
    (pregunta) => pregunta.idPregunta >= 7 && pregunta.idPregunta <= 17
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

  const handleChange = (value, idPregunta) => {
    const nuevosValores = { ...selectedValues };

    if (!nuevosValores[idPregunta]) {
      nuevosValores[idPregunta] = [];
    }

    if (idPregunta === "8") {
      if (nuevosValores[idPregunta].includes(value)) {
        nuevosValores[idPregunta] = nuevosValores[idPregunta].filter(
          (v) => v !== value
        );
      } else {
        if (nuevosValores[idPregunta].length < 2) {
          nuevosValores[idPregunta].push(value);
        }
      }
    } else {
      if (nuevosValores[idPregunta].includes(value)) {
        nuevosValores[idPregunta] = nuevosValores[idPregunta].filter(
          (v) => v !== value
        );
      } else {
        nuevosValores[idPregunta] = [value]; // Solo permite una opción
      }
    }

    setSelectedValues(nuevosValores);
    setUserData(nuevosValores); // Guardar los nuevos valores en el contexto
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-4 bg-white shadow-md rounded-2xl">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-cyan-600">
          ITEM A: CARACTERIZACIÓN GENERAL
        </h1>

        <hr className="border-t-2 border-cyan-500 mb-4" />

        {Object.entries(agrupadasPorPregunta).map(
          ([idPregunta, { textoPregunta, alternativas }]) => (
            <div key={idPregunta}>
              {idPregunta === "9" && (
                <h1 className="text-lg font-semibold mb-2 text-left">
                  Respecto a los siguientes perfiles ¿Qué tan presente está en
                  tu quehacer laboral?
                </h1>
              )}
              <h1 className="text-lg font-semibold mb-4 text-left">
                {textoPregunta}
              </h1>

              <div className="flex flex-col space-y-1 mb-4">
                {alternativas.map(({ idAlternativa, textoAlternativa }) => (
                  <div key={idAlternativa} className="flex items-center">
                    <input
                      type={idPregunta === "8" ? "checkbox" : "radio"}
                      id={`pregunta-${idAlternativa}`}
                      value={textoAlternativa}
                      checked={
                        !!(
                          selectedValues[idPregunta] &&
                          selectedValues[idPregunta].includes(textoAlternativa)
                        )
                      }
                      onChange={() =>
                        handleChange(textoAlternativa, idPregunta)
                      }
                      className="mr-2"
                      disabled={
                        idPregunta === "8" &&
                        selectedValues[idPregunta]?.length >= 2 &&
                        !selectedValues[idPregunta].includes(textoAlternativa)
                      }
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
          onClick={() => setStep(1)}
          className="w-full bg-red-700 text-white py-1 rounded-full hover:bg-red-500 text-sm mb-2"
        >
          Atrás
        </button>

        <button
          onClick={() => {
            setStep(3);
          }}
          className="w-full bg-cyan-800 text-white py-1 rounded-full hover:bg-cyan-600 text-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
