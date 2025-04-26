const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool with environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized: false} : false
});

// Add error logging to help troubleshoot connection issues
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) {
    console.log('Database connected successfully');
    connection.release();
  }
});

// Test query to verify connection
pool.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Database test query failed:', err);
  } else {
    console.log('Database connection verified');
  }
});

module.exports = pool;
