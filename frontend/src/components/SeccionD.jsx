import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionD() {
  const { setStep, userData, setUserData, submitData } =
    useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);

  return (
    <div>
      <h1>ITEM D</h1>

      <button
        onClick={() => setStep(4)}
        className="w-full bg-red-900 text-white py-2 rounded-full hover:bg-red-700 text-sm"
      >
        Atrás
      </button>
      <span></span>
      <button
        onClick={submitData}
        className="w-full bg-blue-900 text-white py-2 rounded-full hover:bg-custom-blue text-sm"
      >
        Enviar
      </button>
    </div>
  );
}
