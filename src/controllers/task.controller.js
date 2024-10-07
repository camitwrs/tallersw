const pool = require('../pg');

const getTask = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM alternativa");
        res.json(result.rows); // Aquí se devuelve solo los datos obtenidos de la consulta
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
}

module.exports = {
    getTask
}
