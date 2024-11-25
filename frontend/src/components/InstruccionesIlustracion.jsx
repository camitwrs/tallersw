import React, { useState } from "react";
import FileUploadModal from "../components/SubirArchivoButton";

const InstruccionesIlustracion = ({ ilustracion, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  // Maneja la apertura del modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Maneja el cierre del modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Maneja la subida del archivo
  const handleFileUpload = (file) => {
    console.log("Archivo recibido:", file); // Debug del archivo subido
    alert(`Archivo "${file.name}" subido exitosamente.`);
    setIsModalOpen(false); // Cierra el modal
  };

  if (!ilustracion) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-600">
          No se ha seleccionado ninguna ilustración.
        </p>
        <button
          onClick={onBack}
          className="bg-YankeesBlue text-white font-bold py-2 px-4 rounded hover:bg-YankeesBlueDark transition duration-300 mt-4"
        >
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Instrucciones de la Ilustración
      </h2>
      <div className="mb-4">
        <p>
          <strong>Nombre:</strong> {ilustracion.nombre}
        </p>
        <p>
          <strong>Proyecto:</strong> {ilustracion.proyecto}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <span
            className={
              ilustracion.estado === "Pendiente"
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {ilustracion.estado}
          </span>
        </p>
      </div>
      <div className="mb-4">
        <p>
          <strong>Descripción:</strong>{" "}
          {ilustracion.descripcion || "Sin descripción."}
        </p>
      </div>
      {ilustracion.fechaLimite && (
        <div className="mb-4">
          <p>
            <strong>Fecha Límite:</strong>{" "}
            {new Date(ilustracion.fechaLimite).toLocaleDateString()}
          </p>
        </div>
      )}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-YankeesBlue text-white font-bold py-2 px-4 rounded hover:bg-YankeesBlueDark transition duration-300"
        >
          Regresar
        </button>
        <button
          onClick={handleOpenModal}
          className="bg-YankeesBlue text-white font-bold py-2 px-4 rounded hover:bg-YankeesBlueDark transition duration-300"
        >
          Subir Archivo
        </button>
      </div>

      {/* Modal para subir archivo */}
      {isModalOpen && (
        <FileUploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default InstruccionesIlustracion;
