const fs = require('fs');
const path = require('path');
const Book = require('../models/bookSchema');
const Copy = require('../models/copiesSchema');



// Retrieve all Copies from the database by the book name.
const getCopiesByBookName = async (req, res) => {
    try {
        const copies = await Copy.find({}).populate('book');
        res.json(copies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Create and Save a new Copy
const saveCopy = async (req, res) => {
  // Validate request
  if (!req.body.issueID || !req.body.book) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
  }

  // Create a new Copy
  console.log(req.body)
  const copy = new Copy({
      issueID: req.body.issueID,
      book: req.body.book
  });

  // Save copy in the database
  try {
      const savedCopy = await copy.save();
      console.log(savedCopy);

      // Update the associated Book's copies array with the new copy's ID
      const book = await Book.findById(req.body.book).exec();
      if (book) {
          book.copies.push(savedCopy._id);
          await book.save();
      }

      res.send(savedCopy);
  } catch (err) {
      res.status(500).send({
          message: "Some error occurred while creating the copy.",
          error: err.message,
      });
  }
};

  

module.exports = {
    getCopiesByBookName,
    saveCopy
};