import React from "react";

const ListaIlustraciones = ({ ilustraciones, onSelect }) => {
  return (
    <div className="container mx-auto mt-8">
      {/* Si no hay ilustraciones */}
      {ilustraciones.length === 0 ? (
        <p className="text-gray-600">No hay ilustraciones disponibles.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {ilustraciones.map((ilustracion) => (
            <div
              key={ilustracion.idIlustracion}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">Ilustración</h3>
                <p className="text-gray-500 text-sm">
                  Fecha de Entrega:{" "}
                  {new Date(ilustracion.fechaentrega).toLocaleDateString()}
                </p>
                <p
                  className={`font-semibold ${
                    ilustracion.estado === "Pendiente"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  Estado: {ilustracion.estado}
                </p>
              </div>
              <button
                onClick={() => onSelect(ilustracion.idIlustracion)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaIlustraciones;
