const pool = require('../pg');

const getTask = async (req, res) => {
    const result = await pool.query("SELECT NOW()")
    res.json(result.rows[0].now)
}

module.exports = {
    getTask
}