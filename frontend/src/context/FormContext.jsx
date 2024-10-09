import React, { useState, createContext, useEffect } from "react";

// Crea el contexto fuera del componente
export const SeccionContext = createContext();

const FormContext = ({ children }) => {
  // Acepta 'children' como props
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
    setUserData("");
    setStep(1);
  }

  useEffect(() => {
    console.log("userData actualizado:", userData);
  }, [userData]); // Esto se ejecutará cada vez que userData cambie DEBUGGER

  useEffect(() => {
    console.log("finalData actualizado:", finalData);
  }, [finalData]); // Esto se ejecutará cada vez que finalData cambie DEBUGGER

  return (
    <SeccionContext.Provider
      value={{
        currentStep,
        setStep,
        userData,
        setUserData,
        finalData,
        setFinalData,
        submitData,
      }}
    >
      {children}
    </SeccionContext.Provider>
  );
};

export default FormContext;
