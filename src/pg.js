const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '5150',
    host: 'localhost',
    port: 5432,
    database: 'Mar_de_Fondo',
})

module.exports = pool;