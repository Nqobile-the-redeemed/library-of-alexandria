const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://nqobilemadziba98:MPxnaN6z3XSF5YxM@alexandriaanubissect.zjuwgyf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database.');
});

// Import your schema models
const Book = require('./models/bookSchema');
const BookLog = require('./models/bookLogSchema');
const Copy = require('./models/copySchema');
const User = require('./models/userSchema');
// Import other schema models if necessary

// Import your routes
const bookRoutes = require('./routes/booksRoutes');
const bookLogRoutes = require('./routes/bookLogRoutes');
const copyRoutes = require('./routes/copiesRoutes');
const userRoutes = require('./routes/usersRoutes');
// Import other routes if necessary

// Use the routes
app.use('/api/books', bookRoutes);
app.use('/api/bookLog', bookLogRoutes);
app.use('/api/copies', copyRoutes);
app.use('/api/users', userRoutes);
// Use other routes if necessary

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
