const mongoose = require("mongose");

const bookLogSchema = new mongoose.Schema({
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    checkoutDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    }
});

const BookLog = mongoose.model('BookLog', bookLogSchema);

module.exports = BookLog;