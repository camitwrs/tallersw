import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CuestionarioPage from "./pages/CuestionarioPage";
import FormContext from "./context/FormContext"; // Asegúrate de la ruta correcta
import Pruebas from "./pages/Pruebas";
import LoginPage from "./pages/LoginPage";
import IlustradorPage from "./pages/IlustradorPage";
//mport VistaJefeDiseño from "./pages/JefeDisenoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Ruta por defecto */}
        <Route path="/pruebas" element={<Pruebas />} /> {/* Ruta por defecto */}
        <Route
          path="/cuestionario"
          element={
            <FormContext>
              <CuestionarioPage />
            </FormContext>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ilustrador" element={<IlustradorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
