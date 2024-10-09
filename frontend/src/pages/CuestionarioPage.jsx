import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SeccionDatos from "../components/SeccionDatos";
import SeccionA from "./../components/SeccionA";
import SeccionB from "./../components/SeccionB";
import SeccionC from "./../components/SeccionC";
import SeccionD from "./../components/SeccionD";
import { Stepper, StepLabel, Step } from "@mui/material";
import { SeccionContext } from "../context/FormContext";

const CuestionarioPage = () => {
  const { currentStep } = useContext(SeccionContext);

  function showSection(step) {
    switch (step) {
      case 1:
        return <SeccionDatos />;
      case 2:
        return <SeccionA />;
      case 3:
        return <SeccionB />;
      case 4:
        return <SeccionC />;
      case 5:
        return <SeccionD />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Botón Volver a Inicio */}
      <div className="absolute top-4 left-4 z-20">
        <Link to="/">
          <button className="bg-custom-blue rounded-full hover:bg-blue-900 text-white font-bold text-sm py-1 px-3 sm:py-2 sm:px-4">
            Volver a Inicio
          </button>
        </Link>
      </div>

      {/* Stepper */}
      <div className="flex justify-center mb-2 w-full overflow-x-auto px-4 z-10 mt-16">
        <Stepper
          className="custom-stepper"
          activeStep={currentStep - 1}
          orientation="horizontal"
        >
          <Step>
            <StepLabel>Información inicial</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sección A</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sección B</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sección C</StepLabel>
          </Step>
          <Step>
            <StepLabel>Sección D</StepLabel>
          </Step>
        </Stepper>
      </div>

      <div className="flex-grow w-full flex items-center justify-center mb-4 p-0">
        {showSection(currentStep)}
      </div>
    </div>
  );
};

export default CuestionarioPage;
