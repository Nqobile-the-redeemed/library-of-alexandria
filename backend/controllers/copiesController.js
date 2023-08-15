const fs = require('fs');
const path = require('path');
const Book = require('../models/bookSchema');
const Copy = require('../models/copiesSchema');


// // Fetch all copies
const getAllCopies = async (req, res) => {
    try {
        // Fetch all copies from the database
        const copies = await Copy.find().populate('book').exec();
        res.json(copies);
    } catch (error) {
        // Error occurred while fetching all copies
        res.status(500).json({ error: 'Failed to fetch copies' });
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
      book: req.body.book,
      notes: req.body.notes,
      state: req.body.state,
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

  
// Edit copy by ID

const editCopyById = async (req, res) => {
    const copyId = req.params._id;
    const updatedCopy = req.body;
  
    try {
      // Find the copy by ID and update its details
      const copy = await Copy.findByIdAndUpdate(copyId, updatedCopy, { new: true });
      console.log(copy)
  
      if (!copy) {
        // Copy with the given ID not found
        return res.status(404).json({ error: 'Copy not found' });
      } 
  
      // Copy updated successfully
      res.json(copy);
    } catch (error) {
      // Error occurred while updating the copy
      res.status(500).json({ error: 'Failed to update copy' });
    }
  };
  

  // Delete copy by ID
const deleteCopyById = async (req, res) => {
    const copyId = req.params._id;

    try {
        // Find the copy by ID and delete it
        const deletedCopy = await Copy.findByIdAndDelete(copyId);

        if (!deletedCopy) {
            // Copy with the given ID not found
            return res.status(404).json({ error: 'Copy not found' });
        }

        // Remove the copy reference from the parent book
        const parentBook = await Book.findByIdAndUpdate(
            deletedCopy.book,
            { $pull: { copies: copyId } },
            { new: true }
        );

        // Return the updated parent book and a success message
        res.json({ message: 'Copy deleted successfully', book: parentBook });
    } catch (error) {
        // Error occurred while deleting the copy
        res.status(500).json({ error: 'Failed to delete copy' });
    }
};



module.exports = {
    editCopyById,
    deleteCopyById,
    getAllCopies,
    saveCopy
};