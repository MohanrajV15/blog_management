const mysql = require('mysql2');
require('dotenv').config({ path: './src/config/config.env' });



const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
console.log(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();
