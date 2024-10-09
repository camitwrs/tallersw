const pool = require("../pg");

const getPreguntas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pregunta");
    res.json(result.rows); // Aquí se devuelve solo los datos obtenidos de la consulta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las preguntas" });
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
                pregunta p
            JOIN
                alternativa a
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

module.exports = {
  getPreguntas,
  getPreguntasPorCategoria,
};
