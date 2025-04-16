require('dotenv').config();
const express = require('express');

const app = express();
const port = 3000;

// Dummy data for contacts
const dummyContacts = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '987-654-3210' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-555-5555' }
];

// Create a route to fetch contacts
app.get('/contacts', (req, res) => {
  try {
    // Send the dummy contact data as a JSON response
    res.status(200).json(dummyContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
