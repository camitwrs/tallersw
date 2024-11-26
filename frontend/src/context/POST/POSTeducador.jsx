const agregarEducador = async (
  idpersona,
  tituloprofesional,
  intereses,
  pais,
  edad,
  institucion,
  sexo
) => {
  try {
    // Validar los parámetros antes de hacer la solicitud
    if (
      !idpersona ||
      !tituloprofesional ||
      !intereses ||
      !pais ||
      !edad ||
      !institucion ||
      !sexo
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al servidor
    const response = await fetch("http://localhost:4000/crearEducador", {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Formato de los datos enviados
      },
      body: JSON.stringify({
        idpersona,
        tituloprofesional,
        intereses,
        pais,
        edad,
        institucion,
        sexo,
      }), // Datos enviados al servidor
    });

    // Verificar si la respuesta del servidor es exitosa
    if (!response.ok) {
      let errorMessage = "Error desconocido al agregar la Educador.";
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

    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al agregar Educador:", error.message);
    throw error; // Re-lanzar el error para manejarlo en otra capa si es necesario
  }
};

export async function agregarPersona_educador(id, resultados) {
  try {
    const idpersona = parseInt(id);
    const tituloprofesional = "x";
    const intereses = "x";
    const pais = resultados.find((item) => item.clave === "4")?.valor;
    const edad = resultados.find((item) => item.clave === "3")?.valor;
    const institucion = resultados.find((item) => item.clave === "5")?.valor;
    const sexo = resultados.find((item) => item.clave === "2")?.valor;

    // Validar todos los campos
    if (
      !idpersona ||
      !tituloprofesional ||
      !intereses ||
      !pais ||
      !edad ||
      !institucion ||
      !sexo
    ) {
      throw new Error("Faltan datos obligatorios para agregar el educador.");
    }

    // Llama a la función de agregar Educador
    const result = await agregarEducador(
      idpersona,
      tituloprofesional,
      intereses,
      pais,
      edad,
      institucion,
      sexo
    );

    return result;
  } catch (error) {
    console.error("Error en agregarPersona_educador:", error.message);
    throw error; // Lanza el error para manejarlo externamente si es necesario
  }
}
