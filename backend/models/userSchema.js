const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleNames: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    bookLog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookLog'
    }],
    copies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Copy'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;