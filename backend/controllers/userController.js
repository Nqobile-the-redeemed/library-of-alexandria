const User = require('../models/userSchema');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, role, ssid } = req.body;
        const user = new User({ firstName, lastName, email, phoneNumber, password, role, ssid });
        await user.save();
        res.status(201).json(user); 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Erro: User error' });
    }
};

module.exports = {
    getUsers,
    saveUser,
};