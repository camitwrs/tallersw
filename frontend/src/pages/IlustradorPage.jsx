import React, { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import ListaIlustraciones from "../components/ListaIlustraciones";
import InstruccionesIlustracion from "../components/InstruccionesIlustracion";

const IlustradorPage = () => {
  const [view, setView] = useState("list"); // Alterna entre "list" y "details"
  const [selectedIlustracion, setSelectedIlustracion] = useState(null);

  const ilustraciones = [
    {
      id: 1,
      nombre: "Ilustración 1",
      proyecto: "Proyecto A",
      estado: "Pendiente",
      descripcion:
        "Esta ilustración debe incluir un diseño minimalista con tonos cálidos.",
      fechaLimite: "2024-12-15",
    },
    {
      id: 2,
      nombre: "Ilustración 2",
      proyecto: "Proyecto B",
      estado: "Terminado",
    },
    {
      id: 3,
      nombre: "Ilustración 3",
      proyecto: "Proyecto C",
      estado: "Pendiente",
    },
  ];

  const handleSelect = (id) => {
    const ilustracion = ilustraciones.find((item) => item.id === id);
    setSelectedIlustracion(ilustracion);
    setView("details"); // Cambia a la vista de detalles
  };

  const handleBack = () => {
    setSelectedIlustracion(null);
    setView("list"); // Regresa a la lista
  };

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-YankeesBlue text-white">
        <h1 className="text-xl font-bold">Ilustraciones Pendientes</h1>
        <LogoutButton />
      </header>

      {/* Contenido Principal */}
      <main>
        {view === "list" && (
          <ListaIlustraciones
            ilustraciones={ilustraciones}
            onSelect={handleSelect}
          />
        )}
        {view === "details" && (
          <InstruccionesIlustracion
            ilustracion={selectedIlustracion}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
};

export default IlustradorPage;
