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

const postPersona = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { nombrepersona, correo, contrasena, rol } = req.body;

    // Validación básica
    if (!nombrepersona || !correo || !contrasena || !rol) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Consulta SQL de inserción
    const query = `
      INSERT INTO public.persona (nombrepersona, correo, contrasena, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    // Ejecuta la consulta
    const result = await pool.query(query, [nombrepersona, correo, contrasena, rol]);

    // Devuelve la respuesta con los datos insertados
    return res.status(201).json({
      message: 'Persona creada exitosamente.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error al insertar persona:', error);
    return res.status(500).json({ error: 'Error del servidor.' });
  }
};



module.exports = {
  getPreguntas,
  getAlternativas,
  getPreguntasPorCategoria,
  getPreguntasPorId,
  getPreguntasPorItem,
  getUniversidades,
  postPersona
};
