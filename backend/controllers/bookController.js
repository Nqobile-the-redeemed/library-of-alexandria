const Book = require('../models/bookSchema');

const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const saveBook = async (req, res) => {
    try {
      const { title, author, description, tags, gallery, checkoutDate, category, copies, bookLog, userLog, ssid, quantity } = req.body;
      const book = new Book({ title, author, description, tags, gallery, checkoutDate, category, copies, bookLog, userLog, ssid, quantity });
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  module.exports = {
    getAllBooks,
    saveBook,
  };
  
