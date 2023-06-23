const BookLog = require('../models/bookLogSchema');

// Get all logs
const getLogs = async (req, res) => {
    try {
        const logs = await BookLog.find();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new log
const createLog = async (req, res) => {
    try {
        const { books, users, checkoutDate, returnDate, email, phoneNumber } = req.body;
        const log = new BookLog({ books, users, checkoutDate, returnDate, email, phoneNumber });
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  module.exports = {
    getLogs,
    createLog,
  };