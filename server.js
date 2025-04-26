const express = require('express');
const app = express();
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schools');

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
