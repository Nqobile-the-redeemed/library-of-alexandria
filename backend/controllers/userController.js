const User = require('../models/userSchema');

// Retrieve all users from the database

const getUsers = async (req, res) => {
  try {
      // Fetch all users from the database with populated book, copies, and bookLog fields
      const users = await User.find()
        .populate('books')
        .populate('copies')
        .populate('bookLog')
        .exec();

      res.json(users);
  } catch (error) {
      // Error occurred while fetching all users
      res.status(500).json({ error: 'Failed to fetch users' });
  }
};





// Create and Save a new user

const saveUser = async (req, res) => {

    // Validate request
    console.log(req.body)
    if (!req.body.firstName) {
      res.status(400).send({ message: "User Needs A Name!" });
      return;
    }
  
    // Create a new User
    const user = new User({
        firstName: req.body.firstName,
        middleNames: req.body.middleNames,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    });
  
    // Save user in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };

module.exports = {
    getUsers,
    saveUser,
};