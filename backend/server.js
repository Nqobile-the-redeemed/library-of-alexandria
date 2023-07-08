const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

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

// Enable CORS
app.use(cors());

// Serve static files from the 'imageUploads' folder
app.use('/api/imageUploads', express.static(path.join(__dirname, 'imageUploads')));


//Enable file upload
app.use(fileUpload()); 

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Import your schema models
const Book = require('./models/bookSchema');
const BookLog = require('./models/bookLogSchema');
const Copy = require('./models/copiesSchema');
const User = require('./models/userSchema');
// Import other schema models if necessary

// Import your routes
const bookRoutes = require('./routes/bookRoutes');
const bookLogRoutes = require('./routes/bookLogRoutes');
const copyRoutes = require('./routes/copiesRoutes');
const userRoutes = require('./routes/userRoutes');
// Import other routes if necessary

// Use the routes
app.use('/api/books', bookRoutes);
app.use('/api/bookLog', bookLogRoutes);
app.use('/api/copies', copyRoutes);
app.use('/api/users', userRoutes);
// Use other routes if necessary

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
