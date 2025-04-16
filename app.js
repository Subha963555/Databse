require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Create a connection pool to PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: 'testdb', // Use 'testdb' as database
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Create a route to fetch products from the 'pro' table
app.get('/products', async (req, res) => {
  try {
    // Query the 'pro' table for all products
    const result = await pool.query('SELECT * FROM pro');
    
    // Send the results as a JSON response
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching data from the database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
