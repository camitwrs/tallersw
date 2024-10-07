const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '5150',
    host: 'localhost',
    port: 5432,
    database: 'marAdentro',
})

module.exports = pool;