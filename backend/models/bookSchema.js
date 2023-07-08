const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String], 
    default: [] 
  },
  gallery: {
    type: [String] // Array of file locations
  },
  bookCover: {
    type: String // File location
  },
  checkoutDate: {
    type: Date
  },
  category: {
    type: String
  },
  copies: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Copy'
  }],
  bookLog: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BookLog'
  }],
  userLog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserLog'
  }],
  ssid:  {
    type: String
  },
  quantity:  {
    type: Number
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
