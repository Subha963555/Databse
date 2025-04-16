// Example Node.js API
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Enable CORS for API testing or cross-domain requests
const cors = require('cors');
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',       // your MySQL host
    user: 'root',            // your MySQL user
    password: '',            // your MySQL password
    database: 'testdb',      // your MySQL database
});

// Simple root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js + MySQL API!');
});

// Endpoint to fetch records from customer table
app.get('/get-records', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('API running on http://localhost:3000');
});
