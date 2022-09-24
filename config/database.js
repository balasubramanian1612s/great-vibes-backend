const { createPool } = require("mysql");

const pool = createPool({
  port: 3306,
  host: "sql6.freemysqlhosting.net",
  user: "sql6522004",
  password: "qIgjhg5KNA",
  database: "sql6522004",
  connectionLimit: 10,
});

module.exports = pool;
