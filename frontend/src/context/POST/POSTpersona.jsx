const agregarPersona = async (
  idpersona,
  nombrepersona,
  correo,
  contrasena,
  rol
) => {
  try {
    // Validar los parámetros antes de hacer la solicitud
    if (!idpersona || !nombrepersona || !correo || !contrasena || !rol) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al servidor
    const response = await fetch("http://localhost:4000/crearPersona", {
      method: "POST", // Método HTTP
      headers: {
        "Content-Type": "application/json", // Formato de los datos enviados
      },
      body: JSON.stringify({
        idpersona,
        nombrepersona,
        correo,
        contrasena,
        rol,
      }), // Datos enviados al servidor
    });

    // Verificar si la respuesta del servidor es exitosa
    if (!response.ok) {
      let errorMessage = "Error desconocido al agregar la persona.";
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
    console.error("Error al agregar persona:", error.message);
    throw error; // Re-lanzar el error para manejarlo en otra capa si es necesario
  }
};

export async function agregarPersona_(numero, resultados) {
  try {
    const professorName = resultados.find((item) => item.clave === "1")?.valor;

    if (!professorName) {
      throw new Error("No se encontró un profesor con clave '1'.");
    }

    const rol = "EDUCADOR";

    const EMAIL = generateEmail();

    // Llama a la función de agregar persona
    const result = await agregarPersona(numero, professorName, EMAIL, "x", rol);

    return result;
  } catch (error) {
    console.error("Error en agregarPersona_profesor:", error);
    throw error; // Lanza el error para manejarlo externamente si es necesario
  }
}

function generateEmail() {
  const domains = ["example.com", "mail.com", "test.com"];
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";

  for (let i = 0; i < 10; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
}
