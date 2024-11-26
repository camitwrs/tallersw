const pool = require("../pg");

const getPreguntas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM preguntas");
    res.json(result.rows); // Aquí se devuelve solo los datos obtenidos de la consulta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las preguntas" });
  }
};

const getAlternativas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alternativas");
    res.json(result.rows); // Aquí se devuelve solo los datos obtenidos de la consulta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las alternativas" });
  }
};

const getPreguntasPorCategoria = async (req, res) => {
  const { categoria } = req.params; // Obtenemos el parámetro 'categoria' desde la URL
  try {
    const result = await pool.query(
      `SELECT
                p."idPregunta",
                p."textoPregunta",
                a."idAlternativa",
                a."textoAlternativa"
            FROM
                preguntas p
            JOIN
                alternativas a
            ON
                p."idPregunta" = a."idPregunta"
            WHERE
                p."item" = $1`, // Uso de parámetros para evitar inyección SQL
      [categoria] // Aquí se pasa el valor de la categoría
    );
    res.json(result.rows); // Devolver los resultados de la consulta
  } catch (error) {
    console.error("Error al obtener preguntas y alternativas:", error);
    res.status(500).json({ error: "Error al obtener las preguntas" });
  }
};

const getPreguntasPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM preguntas WHERE "idPregunta" = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    res.status(500).json({ error: "Error al obtener las preguntas" });
  }
};

const getPreguntasPorItem = async (req, res) => {
  const { item } = req.params; // Obtenemos el parámetro 'item' desde la URL
  try {
    const result = await pool.query(
      `select * from preguntas left join alternativas ON preguntas."idPregunta" = alternativas."idpregunta" where preguntas."item" = $1 `, // Uso de parámetros para evitar inyección SQL
      [item] // Aquí se pasa el valor del item
    );
    res.json(result.rows); // Devolver los resultados de la consulta
  } catch (error) {
    console.error("Error al obtener preguntas y alternativas:", error);
    res.status(500).json({ error: "Error al obtener las preguntas" });
  }
};

const getUniversidades = async (req, res) => {
  try {
    // Consulta a la API externa
    const response = await fetch(`http://universities.hipolabs.com/search?`);
    if (!response.ok) {
      throw new Error('Error al consultar la API de universidades');
    }

    const universidades = await response.json(); // Parsear los datos de la respuesta
    res.json(universidades); // Enviar los datos al cliente
  } catch (error) {
    console.error("Error al obtener universidades:", error);
    res.status(500).json({ error: "Error al obtener las universidades" });
  }
};

const crearPersona = async (req, res) => {
  try {
    // Validar que el cuerpo de la solicitud contiene los datos necesarios
    const { idpersona, nombrepersona, correo, contrasena, rol } = req.body;

    if (!idpersona || !nombrepersona || !correo || !contrasena || !rol) {
      return res.status(400).json({
        error: "Todos los campos (idpersona, nombrepersona, correo, contrasena, rol) son obligatorios.",
      });
    }

    // Consulta a la base de datos
    const query = `
      INSERT INTO persona (idpersona, nombrepersona, correo, contrasena, rol)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [idpersona, nombrepersona, correo, contrasena, rol]);

    // Respuesta exitosa
    return res.status(201).json({
      message: "Persona creada exitosamente.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error al crear persona:", error.message);

    // Manejo de errores específicos
    if (error.code === '23505') { // Código de error para violación de unicidad
      return res.status(400).json({ error: "El correo o el idpersona ya está registrado." });
    }

    // Error genérico
    return res.status(500).json({ error: "Ocurrió un error al intentar crear la persona." });
  }
};

const crearEducador = async (req, res) => {
  try {
    // Validar que el cuerpo de la solicitud no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "El cuerpo de la solicitud está vacío." });
    }

    // Extraer los datos del cuerpo
    const { idpersona, tituloprofesional, intereses, pais, edad, institucion, sexo } = req.body;

    // Validación básica
    const camposFaltantes = [];
    if (!idpersona) camposFaltantes.push("idpersona");
    if (!tituloprofesional) camposFaltantes.push("tituloprofesional");
    if (!intereses) camposFaltantes.push("intereses");
    if (!pais) camposFaltantes.push("pais");
    if (!edad) camposFaltantes.push("edad");
    if (!institucion) camposFaltantes.push("institucion");
    if (!sexo) camposFaltantes.push("sexo");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error: `Faltan los siguientes campos obligatorios: ${camposFaltantes.join(", ")}.`,
      });
    }

    // Consulta a la base de datos
    const query = `
      INSERT INTO educador (idpersona, tituloprofesional, intereses, pais, edad, institucion, sexo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      idpersona,
      tituloprofesional,
      intereses,
      pais,
      edad,
      institucion,
      sexo,
    ]);

    // Respuesta exitosa
    return res.status(201).json({
      message: "Educador creado exitosamente.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error al crear Educador:", error);

    // Manejo de errores de la base de datos
    if (error.code === "23503") {
      return res.status(400).json({ error: "El idpersona proporcionado no existe en la tabla persona." });
    }

    return res.status(500).json({ error: "Ocurrió un error al intentar crear el Educador." });
  }
};

const getCantidadPersonas = async (req, res) => {
  try {
    // Realizamos la consulta para obtener la cantidad de filas en la tabla personas
    const result = await pool.query("SELECT COUNT(*) FROM persona");

    // Enviar la cantidad de filas obtenida
    res.json({ cantidad: result.rows[0].count }); // El resultado es un objeto con la propiedad count
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la cantidad de personas" });
  }
};

const crearRespuesta = async (req, res) => {
  try {
    // Validar que el cuerpo de la solicitud no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "El cuerpo de la solicitud está vacío." });
    }

    // Extraer los datos del cuerpo
    const { idpersona, numeroalternativa, resultado, fecha } = req.body;

    // Validación básica
    const camposFaltantes = [];
    if (!idpersona) camposFaltantes.push("idpersona");
    if (!numeroalternativa) camposFaltantes.push("numeroalternativa");
    if (!resultado) camposFaltantes.push("resultado");
    if (!fecha) camposFaltantes.push("fecha");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error: `Faltan los siguientes campos obligatorios: ${camposFaltantes.join(", ")}.`,
      });
    }

    // Consulta a la base de datos
    const query = `
      INSERT INTO respuesta (idpersona, numeroalternativa, resultado, fecha)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      idpersona,
      numeroalternativa,
      resultado,
      fecha,
    ]);

    // Respuesta exitosa
    return res.status(201).json({
      message: "Respuesta creada exitosamente.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error al crear Respuesta:", error);

    // Manejo de errores de la base de datos
    if (error.code === "23503") {
      return res.status(400).json({ error: "El idpersona proporcionado no existe en la tabla persona." });
    }

    return res.status(500).json({ error: "Ocurrió un error al intentar crear la Respuesta." });
  }
};

const crearIlustracion = async (req, res) => {
  try {
    // Validar que el cuerpo de la solicitud no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "El cuerpo de la solicitud está vacío." });
    }

    // Extraer los datos del cuerpo
    const { ideducador, iddisenador, prompt, imagen, titulo, fechaentrega, estado } = req.body;

    // Validación básica
    const camposFaltantes = [];
    if (!ideducador) camposFaltantes.push("ideducador");
    if (!iddisenador) camposFaltantes.push("iddisenador");
    if (!prompt) camposFaltantes.push("prompt");
    if (!imagen) camposFaltantes.push("imagen");
    if (!titulo) camposFaltantes.push("titulo");
    if (!fechaentrega) camposFaltantes.push("fechaentrega");
    if (!estado) camposFaltantes.push("estado");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error: `Faltan los siguientes campos obligatorios: ${camposFaltantes.join(", ")}.`,
      });
    }

    // Consulta a la base de datos
    const query = `
      INSERT INTO ilustracion (ideducador, iddisenador, prompt, imagen, titulo, fechaentrega, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      ideducador,
      iddisenador,
      prompt,
      imagen,
      titulo,
      fechaentrega,
      estado,
    ]);

    // Respuesta exitosa
    return res.status(201).json({
      message: "Ilustración creada exitosamente.",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error al crear Ilustración:", error);

    // Manejo de errores de la base de datos
    if (error.code === "23503") {
      return res.status(400).json({
        error: "El ideducador o iddisenador proporcionado no existe en las tablas relacionadas.",
      });
    }

    return res.status(500).json({ error: "Ocurrió un error al intentar crear la Ilustración." });
  }
};


module.exports = {
  getPreguntas,
  getAlternativas,
  getPreguntasPorCategoria,
  getPreguntasPorId,
  getPreguntasPorItem,
  getUniversidades,
  crearPersona,
  crearEducador,
  getCantidadPersonas,
  crearRespuesta,
  crearIlustracion
};
