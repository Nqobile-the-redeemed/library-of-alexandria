const Book = require('../models/bookSchema');
const fs = require('fs');
const path = require('path');


// Retrieve all Books from the database.

const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find()
        .populate('userLog')
        .populate('copies')
        .populate('bookLog')
        .exec();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error: Retrivee book error' });
    }
  };


// Create and Save a new Book

const saveBook = async (req, res) => {

  // Validate request
  console.log(req.body)
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a new Book
  const book = new Book({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
  });

  // Save book in the database
  book
    .save(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the book."
      });
    });
};


// Upload an image file to the server
 
const uploadImage = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    const { bookCover } = req.files; // Assuming the field name in the form is 'bookCover'

    // Generate a unique file name to avoid conflicts
    const fileName = `${Date.now()}_${bookCover.name}`;

    const uploadPath = path.join(__dirname, '../imageUploads', fileName);

    // Move the uploaded file to the specified path
    bookCover.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload the file' });
      }

      // Construct the file URL using the base URL and the encoded file name
      const encodedFileName = encodeURIComponent(fileName);
      const fileURL = `http://localhost:5000/api/imageUploads/${encodedFileName}`;
      console.log(fileURL)

      // Return the file URL to the frontend
      res.json({ fileURL: fileURL  });

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Edit book by ID

const editBookById = async (req, res) => {
  const bookId = req.params._id;
  const updatedBook = req.body;

  try {
    // Find the book by ID and update its details
    const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    console.log(book)

    if (!book) {
      // Book with the given ID not found
      return res.status(404).json({ error: 'Book not found' });
    } 

    // Book updated successfully
    res.json(book);
  } catch (error) {
    // Error occurred while updating the book
    res.status(500).json({ error: 'Failed to update book' });
  }
};


 module.exports = {
   saveBook,
   getAllBooks,
   editBookById,
   uploadImage,
 };