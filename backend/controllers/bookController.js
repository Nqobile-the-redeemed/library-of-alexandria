const Book = require('../models/bookSchema');

const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error: Retrivee book error' });
    }
  };

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
 

 module.exports = {
   saveBook,
   getAllBooks
 };