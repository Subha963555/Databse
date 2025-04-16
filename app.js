const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Enable CORS for API testing or cross-domain requests
app.use(cors());
app.use(express.json());

// Database configuration using environment variables
const dbConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1', // Use environment variable for remote DB
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'subha9932@',
  database: process.env.MYSQL_DB || 'customers',  // Make sure DB name matches
  port: 3306,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

// Connect with error handling
const connectToDatabase = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('Successfully connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Failed to connect to database:', error.message);
    return false;
  }
};

// Simple root route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js + MySQL API!');
});

// Endpoint to fetch records from customer table
app.get('/get-records', async (req, res) => {
  try {
    const [results] = await promisePool.query('SELECT * FROM customers');
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error occurred', details: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`API running on http://localhost:${PORT}`);
  await connectToDatabase();
});
