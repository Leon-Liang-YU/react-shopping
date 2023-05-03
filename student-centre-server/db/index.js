const { Pool } = require("pg")

const pool = new Pool({
  database: "studentcentre",
})

module.exports = pool
