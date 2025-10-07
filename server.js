// Import required modules
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/Auth');
const errorHandler = require('./middlewares/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());

app.use(logger);
app.use(errorHandler);
app.use('/api/products', productRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});


// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admin', auth, (req, res) => {
  res.send('Welcome to the admin area!');
});

app.get('/api/public', (req, res) => res.send('Public Route'));
app.get('/api/private', auth, (req, res) => res.send('Protected Route'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 