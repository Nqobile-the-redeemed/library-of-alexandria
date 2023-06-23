const Copies = require('../models/copiesModel');

// Get all copies
const getCopies = async (req, res) => {
    try {
        const copies = await Copies.find();
        res.json(copies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const newCopy = async (req, res) => {
    try {
        const { book, status } = req.body;
        const copy = new Copies({ book, status });
        await copy.save();
        res.status(201).json(copy);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCopies,
    newCopy,
};