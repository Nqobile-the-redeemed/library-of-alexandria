const Copies = require('../models/copiesSchema');

const getCopies = async (req, res) => {
    try {
        const copies = await Copies.find();
        res.json(copies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveCopy = async (req, res) => {
    try {
        const { title, author, description, tags, gallery, checkoutDate, category, copies, bookLog, userLog, ssid, quantity } = req.body;
        const copy = new Copies({ title, author, description, tags, gallery, checkoutDate, category, copies, bookLog, userLog, ssid, quantity });
        await copy.save();
        res.status(201).json(copy);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCopies,
    saveCopy,
};