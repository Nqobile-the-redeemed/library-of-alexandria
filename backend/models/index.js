const url = 'mongodb+srv://nqobilemadziba98:MPxnaN6z3XSF5YxM@alexandriaanubissect.zjuwgyf.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.book = require("./bookSchema.js")(mongoose);

module.exports = db; //exporting module to database