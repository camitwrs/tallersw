import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionDatos() {
  const { setStep, userData, setUserData } = useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const terminosYCondiciones = `
    Autorizo el uso de los datos para el proceso de investigación y difusión del proyecto "Wild E", que tiene por objetivo fortalecer la educación en emprendimiento en instituciones de educación superior de América y Europa, a través de un modelo teórico y la utilización de recursos audiovisuales inspirados en la naturaleza y la fauna local. 
  
    He sido informado(a) de que se puede hacer preguntas sobre la investigación en cualquier momento y que es posible el retractar mi decisión al respecto, sin tener que dar explicaciones ni sufrir consecuencia alguna por tal decisión. 
  
    De tener preguntas, reclamos o comentarios sobre la participación en este proyecto, contactar al equipo responsable Pablo Zamora (pablo.zamora@pucv.cl) y Patricia Ibáñez (patricia.iban@gmail.com)
  `;

  const cargarPreguntas = async () => {
    try {
      const response = await fetch(`http://localhost:4000/preguntas`);
      const data = await response.json();
      const preguntasA1 = data.filter((pregunta) => pregunta.item === "A1");
      setPreguntas(preguntasA1);
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto mb-4 p-8 bg-white shadow-md rounded-2xl">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        {preguntas.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-cyan-600">
              DATOS PERSONALES
            </h2>
            {preguntas.map((pregunta) => (
              <div key={pregunta.idPregunta} className="mb-3">
                <label
                  htmlFor={pregunta.textoPregunta
                    .replace(/\s+/g, "")
                    .toLowerCase()}
                  className="block text-gray-700 font-medium mb-1"
                >
                  {pregunta.textoPregunta}
                </label>

                {/* Input de nombre completo */}
                {pregunta.idPregunta === 1 && (
                  <input
                    type="text"
                    id={pregunta.textoPregunta
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                    name="nombrecompleto"
                    placeholder="Escriba su nombre completo"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    required
                    value={userData["nombrecompleto"]}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        nombrecompleto: e.target.value,
                      })
                    }
                  />
                )}

                {/* Select para sexo */}
                {pregunta.idPregunta === 2 && (
                  <select
                    id={pregunta.textoPregunta
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                    name="sexo"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    required
                    value={userData["sexo"] || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, sexo: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Seleccione su sexo
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                )}

                {/* Input para edad */}
                {pregunta.idPregunta === 3 && (
                  <input
                    type="number"
                    id={pregunta.textoPregunta
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                    name="edad"
                    placeholder="Ingrese su edad"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    required
                    value={userData["edad"] || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, edad: e.target.value })
                    }
                  />
                )}

                {/* Select para país */}
                {pregunta.idPregunta === 4 && (
                  <select
                    id={pregunta.textoPregunta
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                    name="pais"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    required
                    value={userData["pais"] || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, pais: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Seleccione su país
                    </option>
                    <option value="Chile">Chile</option>
                  </select>
                )}

                {/* Select para universidad */}
                {pregunta.idPregunta === 5 && (
                  <select
                    id={pregunta.textoPregunta
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                    name="universidad"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    required
                    value={userData["universidad"] || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, universidad: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Seleccione su universidad
                    </option>
                    <option value="Universidad_de_Chile">
                      Universidad de Chile
                    </option>
                    <option value="Universidad_de_Chile">
                      Universidad de Chile
                    </option>
                    <option value="PUC_Chile">
                      Pontificia Universidad Catolica de Chile
                    </option>
                    <option value="PUCV">
                      Pontificia Universidad Catolica de Valparaiso
                    </option>
                    <option value="USACH">
                      Universidad de Santiago de Chile
                    </option>
                    <option value="UdeC">Universidad de Concepción</option>
                    <option value="UTFSM">
                      Universidad Técnica Federico Santa María
                    </option>
                    <option value="UAustral">
                      Universidad Austral de Chile
                    </option>
                    <option value="UValparaiso">
                      Universidad de Valparaíso
                    </option>
                    <option value="UFrontera">
                      Universidad de La Frontera
                    </option>
                    <option value="UAI">Universidad Adolfo Ibáñez</option>
                    <option value="UDP">Universidad Diego Portales</option>
                    <option value="UNAB">Universidad Andrés Bello</option>
                    <option value="UDD">Universidad del Desarrollo</option>
                    <option value="UdeLosAndes">
                      Universidad de los Andes
                    </option>
                    <option value="Otras">Otras</option>
                  </select>
                )}

                {/* Input para año de experiencia */}
                {pregunta.idPregunta === 6 && (
                  <input
                    type="number"
                    id={pregunta.textoPregunta
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                    name="aniosexperiencia"
                    placeholder="Ingrese los años de experiencia"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    required
                    value={userData["aniosexperiencia"] || ""}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        aniosexperiencia: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            ))}

            {/* Checkbox para aceptar términos y condiciones */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="mr-2"
                />
                Acepto los términos y condiciones
              </label>
            </div>

            <button
              onClick={() => {
                if (aceptaTerminos) {
                  setStep(2);
                } else {
                  alert(
                    "Debes aceptar los términos y condiciones para continuar."
                  );
                }
              }}
              className="w-full bg-cyan-800 text-white py-2 rounded-full hover:bg-cyan-600 text-sm"
            >
              Siguiente
            </button>
          </>
        ) : (
          <p>No hay preguntas disponibles</p>
        )}
      </div>

      <div className="border-t lg:border-t-0 lg:border-l lg:pl-4 lg:w-1/2 p-4">
        <h3 className="font-bold text-lg text-center">
          Términos y Condiciones
        </h3>
        <p className="whitespace-pre-wrap text-gray-700 text-center">
          {terminosYCondiciones}
        </p>
      </div>
    </div>
  );
}
