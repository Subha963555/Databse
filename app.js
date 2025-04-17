const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Enable parsing JSON bodies

// ✅ MongoDB Atlas URI
const mongoURI = 'mongodb+srv://bossubhadip19:TJNf0oJMzSlKwGv8@cluster0.nvwskyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// ✅ Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Define the Contact schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// ✅ Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// ✅ Root route
app.get('/', (req, res) => {
    res.send('MongoDB + Node.js API is working!');
});

// ✅ POST: Add a new contact (standard method)
app.post('/contacts', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// ✅ GET: Fetch all contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// ✅ POST: Create a contact using URL parameters
app.get('/create-contact', async (req, res) => {
  // Extract URL parameters
  const { name, email, phone } = req.query;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    // Create and save the new contact using the URL parameters
    const contact = new Contact({ name, email, phone });
    await contact.save();
    res.status(201).json({ message: '✅ Contact created via URL parameters', contact });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Start the server
app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
