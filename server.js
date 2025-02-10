const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Use cors middleware and allow localhost and anywhere and also my new tauri app to access the API .exe file
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/printers', require('./routes/printers'));
app.use('/api/config', require('./routes/config'));
app.use('/api/clients', require('./routes/client'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});