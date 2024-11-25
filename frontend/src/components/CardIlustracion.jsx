import React from "react";

const CardIlustracion = ({ ilustracion, onClick }) => {
  return (
    <div
      className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick(ilustracion.id)}
    >
      <h3 className="font-bold text-lg">{ilustracion.nombre}</h3>
      <p>Proyecto: {ilustracion.proyecto}</p>
      <p
        className={`font-semibold ${
          ilustracion.estado === "Pendiente" ? "text-red-500" : "text-green-500"
        }`}
      >
        Estado: {ilustracion.estado}
      </p>
    </div>
  );
};

export default CardIlustracion;
