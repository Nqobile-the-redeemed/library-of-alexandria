const mongoose = require('mongoose');

const copySchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    bookLog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookLog'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issueID: {
        type: String
    },
    state: {
        type: String
    },
    notes: {
        type: String
    },availability: {
        type: String,
        enum: ['Available', 'Checked Out', 'Lost', 'Damaged'],
        default: 'Available'
    },

});

const Copy = mongoose.model('Copy', copySchema);

module.exports = Copy;