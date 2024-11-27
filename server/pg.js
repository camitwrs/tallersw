const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Wout2716",
  host: "localhost",
  port: 5432,
  database: "wilde",
});

module.exports = pool;
