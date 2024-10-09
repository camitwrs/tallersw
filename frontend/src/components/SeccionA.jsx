import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionA() {
  const { userData, setUserData, setStep } = useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

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

  // useEffect para sincronizar selectedValues con userData
  useEffect(() => {
    // Inicializa selectedValues con los datos de userData al montar el componente
    setSelectedValues(userData);
  }, [userData]); // Se ejecuta cuando userData cambia

  const handleChange = (value, idPregunta) => {
    const updatedSelectedValues = { ...selectedValues };

    // Inicializa el array de valores seleccionados si no existe
    if (!updatedSelectedValues[idPregunta]) {
      updatedSelectedValues[idPregunta] = [];
    }

    if (idPregunta === "8") {
      // Permite seleccionar hasta 2 opciones
      if (updatedSelectedValues[idPregunta].includes(value)) {
        // Si ya está seleccionado, lo deselecciona
        updatedSelectedValues[idPregunta] = updatedSelectedValues[
          idPregunta
        ].filter((v) => v !== value);
      } else {
        // Si no está seleccionado y hay menos de 2 seleccionados, lo selecciona
        if (updatedSelectedValues[idPregunta].length < 2) {
          updatedSelectedValues[idPregunta].push(value);
        }
      }
    } else {
      // Solo permite seleccionar una opción
      if (updatedSelectedValues[idPregunta].includes(value)) {
        updatedSelectedValues[idPregunta] = updatedSelectedValues[
          idPregunta
        ].filter((v) => v !== value);
      } else {
        updatedSelectedValues[idPregunta] = [value]; // Solo permite una opción
      }
    }

    setSelectedValues(updatedSelectedValues); // Actualiza el estado local

    // Actualiza userData en el contexto
    setUserData((prevUserData) => ({
      ...prevUserData,
      [idPregunta]: updatedSelectedValues[idPregunta],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-4 bg-white shadow-md rounded-2xl">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        {/* Título añadido aquí */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          ITEM A: CARACTERIZACIÓN GENERAL
        </h1>

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
                      type={idPregunta === "8" ? "checkbox" : "radio"} // Cambia a checkbox para idPregunta 8
                      id={`pregunta-${idAlternativa}`}
                      value={textoAlternativa}
                      checked={
                        !!(
                          selectedValues[idPregunta] &&
                          selectedValues[idPregunta].includes(textoAlternativa)
                        )
                      } // Asegura que siempre sea booleano con !!
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
          className="w-full bg-red-900 text-white py-1 rounded-full hover:bg-red-700 text-sm mb-2"
        >
          Atrás
        </button>

        <button
          onClick={() => {
            setStep(3);
          }}
          className="w-full bg-blue-900 text-white py-1 rounded-full hover:bg-blue-700 text-sm"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
