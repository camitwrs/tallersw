import React, { useState } from "react";
import FileUploadModal from "../components/SubirArchivoButton";

const InstruccionesIlustracion = ({ ilustracion, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleFileUpload = (file) => {
    console.log("Archivo recibido:", file);
    alert(`Archivo "${file.name}" subido exitosamente.`);
    setIsModalOpen(false);
  };

  if (!ilustracion) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-600">
          No se ha seleccionado ninguna ilustración.
        </p>
        <button
          onClick={onBack}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition duration-300 mt-4"
        >
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Detalles de la Ilustración</h2>
      <div className="mb-4">
        <p>
          <strong>Título:</strong> {ilustracion.titulo}
        </p>
        <p>
          <strong>Prompt:</strong> {ilustracion.prompt}
        </p>
        <p>
          <strong>Proyecto:</strong> {ilustracion.idDisenador}
        </p>
        <p>
          <strong>Fecha de Entrega:</strong>{" "}
          {new Date(ilustracion.fechaentrega).toLocaleDateString()}
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
      {ilustracion.imagen && (
        <div className="mb-4">
          <img
            src={ilustracion.imagen}
            alt={ilustracion.titulo}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
        >
          Regresar
        </button>
        <button
          onClick={handleOpenModal}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
        >
          Subir Archivo
        </button>
      </div>

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
