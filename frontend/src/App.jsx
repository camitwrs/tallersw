import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CuestionarioPage from "./pages/CuestionarioPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Ruta por defecto */}
        <Route path="/cuestionario" element={<CuestionarioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
