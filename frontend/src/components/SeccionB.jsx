import React, { useContext, useEffect, useState } from "react";
import { SeccionContext } from "../context/FormContext";

export default function SeccionB() {
  const { setStep, userData, setUserData } = useContext(SeccionContext);
  const [preguntas, setPreguntas] = useState([]);

  return (
    <div>
      <h1>ITEM B</h1>

      <button
        onClick={() => setStep(2)}
        className="w-full bg-red-900 text-white py-2 rounded-full hover:bg-red-700 text-sm"
      >
        Atrás
      </button>
      <span></span>
      <button
        onClick={() => setStep(4)}
        className="w-full bg-blue-900 text-white py-2 rounded-full hover:bg-custom-blue text-sm"
      >
        Siguiente
      </button>
    </div>
  );
}
