const Copies = require('../models/copiesSchema');
const fs = require('fs');
const path = require('path');


// Retrieve all Copies from the database by the book name.
const getCopiesByBookName = async (req, res) => {
    try {
        const copies = await Copy.find({}).populate('book');
        res.json(copies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getCopiesByBookName,
};