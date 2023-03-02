const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // database: "db_employees",
  database: "db_employees_test",
  password: "1",
  port: 5432,
});

module.exports = pool;
