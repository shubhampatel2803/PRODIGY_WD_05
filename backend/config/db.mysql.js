const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
});

const initMySQL = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS search_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(255),
        lat FLOAT,
        lon FLOAT,
        temperature FLOAT,
        description VARCHAR(255),
        searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    conn.release();
    console.log('✅ MySQL connected & table ready');
  } catch (err) {
    console.error('❌ MySQL Error:', err.message);
  }
};

module.exports = { pool, initMySQL };