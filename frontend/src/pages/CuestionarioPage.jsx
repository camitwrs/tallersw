import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "../context/FormContext";

const CuestionarioPage = () => {
  const {
    setUserData,
    userData,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    submitData,
  } = useContext(FormContext);
  const [preguntas, setPreguntas] = useState([]);
  const [alternativas, setAlternativas] = useState({});
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  // Cargar preguntas y alternativas desde el backend
  useEffect(() => {
    const cargarPreguntasYAlternativas = async () => {
      try {
        const responsePreguntas = await fetch(
          "http://localhost:4000/preguntas"
        );
        let dataPreguntas = await responsePreguntas.json();

        // Ordenar preguntas por idPregunta de forma ascendente
        dataPreguntas = dataPreguntas.sort(
          (a, b) => a.idPregunta - b.idPregunta
        );

        const responseAlternativas = await fetch(
          "http://localhost:4000/alternativas"
        );
        const dataAlternativas = await responseAlternativas.json();

        setPreguntas(dataPreguntas);

        // Agrupar alternativas por idPregunta para un acceso rápido
        const alternativasPorPregunta = dataAlternativas.reduce(
          (acc, alternativa) => {
            const { idPregunta } = alternativa;
            if (!acc[idPregunta]) acc[idPregunta] = [];
            acc[idPregunta].push(alternativa);
            return acc;
          },
          {}
        );

        setAlternativas(alternativasPorPregunta);
      } catch (error) {
        console.error("Error al cargar las preguntas y alternativas:", error);
      }
    };
    cargarPreguntasYAlternativas();
  }, []);

  const handleStartQuiz = () => {
    if (aceptaTerminos) {
      setIsQuizStarted(true);
      setCurrentQuestionIndex(0);
    } else {
      alert("Debes aceptar los términos y condiciones para continuar.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [preguntas[currentQuestionIndex].idPregunta]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const updatedSelections =
      userData[preguntas[currentQuestionIndex].idPregunta] || [];
    if (e.target.checked) {
      updatedSelections.push(e.target.value);
    } else {
      const index = updatedSelections.indexOf(e.target.value);
      if (index > -1) updatedSelections.splice(index, 1);
    }
    setUserData({
      ...userData,
      [preguntas[currentQuestionIndex].idPregunta]: updatedSelections,
    });
  };

  const handleSendQuiz = () => {
    submitData();
    alert("Cuestionario completado");
  };

  const renderQuestion = () => {
    const pregunta = preguntas[currentQuestionIndex];
    if (!pregunta) return null;

    const opciones = alternativas[pregunta.idPregunta] || [];

    switch (pregunta.tipo) {
      case "text":
        return (
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            value={userData[pregunta.idPregunta] || ""}
            onChange={handleInputChange}
            placeholder="Escribe tu respuesta"
          />
        );

      case "radio":
        return opciones.map((opcion, index) => (
          <label key={index} className="flex items-center mb-2">
            <input
              type="radio"
              name={`pregunta-${pregunta.idPregunta}`}
              value={opcion.textoAlternativa}
              checked={
                userData[pregunta.idPregunta] === opcion.textoAlternativa
              }
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-gray-700">{opcion.textoAlternativa}</span>
          </label>
        ));

      case "checkbox":
        return opciones.map((opcion, index) => (
          <label key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={opcion.textoAlternativa}
              checked={(userData[pregunta.idPregunta] || []).includes(
                opcion.textoAlternativa
              )}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span className="text-gray-700">{opcion.textoAlternativa}</span>
          </label>
        ));

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4 relative">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <button className="bg-teal-600 rounded-full hover:bg-teal-500 text-white font-semibold py-2 px-6 shadow-md">
            Volver a Inicio
          </button>
        </Link>
      </div>

      {!isQuizStarted ? (
        <div className="flex flex-col items-center justify-center bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
          <h3 className="font-bold text-lg text-center mb-4 text-teal-700">
            Términos y Condiciones
          </h3>
          <p className="text-gray-600 text-sm text-center mb-6">
            Autorizo el uso de los datos para el proceso de investigación y
            difusión del proyecto Wild E, que tiene por objetivo fortalecer la
            educación en emprendimiento en instituciones de educación superior
            de América y Europa, a través de un modelo teórico y la utilización
            de recursos audiovisuales inspirados en la naturaleza y la fauna
            local.He sido informado(a) de que se puede hacer preguntas sobre la
            investigación en cualquier momento y que es posible el retractar mi
            decisión al respecto, sin tener que dar explicaciones ni sufrir
            consecuencia alguna por tal decisión.De tener preguntas, reclamos o
            comentarios sobre la participación en este proyecto, contactar al
            equipo responsable Pablo Zamora (pablo.zamora@pucv.cl) y Patricia
            Ibáñez (patricia.iban@gmail.com).
          </p>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-700">
              Acepto los términos y condiciones
            </span>
          </label>
          <button
            onClick={handleStartQuiz}
            className="bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-600 w-full"
          >
            Iniciar Cuestionario
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-center text-teal-700">
            {preguntas[currentQuestionIndex]?.textoPregunta}
          </h2>

          {renderQuestion()}

          <div className="flex justify-between mt-6 w-full">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            {currentQuestionIndex < preguntas.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-600"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSendQuiz}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500"
              >
                Enviar
              </button>
            )}
          </div>
        </div>
      )}

      <p className="absolute bottom-4 text-s text-gray-500">
        La duración del cuestionario es de 20 minutos aproximadamente.
      </p>
    </div>
  );
};

export default CuestionarioPage;
