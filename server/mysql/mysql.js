const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'enchere_app-db',
});

module.exports = pool;