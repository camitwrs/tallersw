const agregarRespuesta = async (idpersona, numeroalternativa, resultado) => {
  try {
    // Generar la fecha actual en formato 'YYYY-MM-DD'
    const fecha = new Date().toISOString().split("T")[0]; // Extraer solo la parte de la fecha

    // Validar los parámetros antes de hacer la solicitud
    if (!idpersona || !numeroalternativa || !resultado || !fecha) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al servidor
    const response = await fetch("http://localhost:4000/crearRespuesta", {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Formato de los datos enviados
      },
      body: JSON.stringify({
        idpersona,
        numeroalternativa,
        resultado,
        fecha,
      }), // Datos enviados al servidor
    });

    // Verificar si la respuesta del servidor es exitosa
    if (!response.ok) {
      let errorMessage = "Error desconocido al agregar la respuesta.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.warn(
          "No se pudo interpretar el error del servidor:",
          parseError
        );
      }
      throw new Error(errorMessage);
    }

    // Parsear y devolver los datos de respuesta del servidor
    const data = await response.json();
    console.log("Respuesta agregada exitosamente:", data);
    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al agregar respuesta:", error.message);
    throw error; // Re-lanzar el error para manejarlo en otra capa si es necesario
  }
};

export async function agregarRespuestaParaProfesor(idpersona, resultados) {
  try {
    // Iterar sobre las claves y valores del objeto resultados
    for (const [clave, valor] of Object.entries(resultados)) {
      // Verificar que tanto clave como valor sean válidos
      if (!clave || valor === undefined || valor === null) {
        console.warn(`Datos inválidos para clave ${clave}. Se omite.`);
        continue;
      }

      // Mostrar las claves y valores antes de llamar a la función
      console.log(`Procesando clave: ${clave}, valor: ${valor}`);

      // Llama a la función de agregar respuesta
      const result = await agregarRespuesta(
        idpersona,
        valor.clave,
        valor.valor
      );

      console.log(`Respuesta agregada con éxito para clave ${clave}:`, result);
    }

    console.log("Todas las respuestas se han procesado correctamente.");
  } catch (error) {
    console.error("Error en agregarRespuestaParaProfesor:", error);
    throw error; // Lanza el error para manejarlo externamente si es necesario
  }
}
