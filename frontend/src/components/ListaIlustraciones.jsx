import React from "react";

const ListaIlustraciones = ({ ilustraciones, onSelect }) => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Ilustraciones</h2>
      {/* Si no hay ilustraciones */}
      {ilustraciones.length === 0 ? (
        <p className="text-gray-600">No hay ilustraciones disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ilustraciones.map((ilustracion) => (
            <div
              key={ilustracion.id}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
              onClick={() => onSelect(ilustracion.id)}
            >
              <h3 className="font-bold text-lg">{ilustracion.nombre}</h3>
              <p>Proyecto: {ilustracion.proyecto}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaIlustraciones;
