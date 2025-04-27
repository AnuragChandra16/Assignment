// const mysql = require('mysql2');
// require('dotenv').config();
// // Create connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: process.env.DB_PASSWORD,
//   database: 'school_management',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;




const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database as ID', connection.threadId);
  connection.release();
});

module.exports = pool;
