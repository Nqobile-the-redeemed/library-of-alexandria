const mongoose = require('mongoose');
const BookLog = require('../models/bookLogSchema');
const User = require('../models/userSchema');
const Book = require('../models/bookSchema');
const Copy = require('../models/copiesSchema');


// Return a bookLog with the specified id in the request

const returnLog = async (req, res) => {
    const bookLogId = req.params._id;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const endedBookLog = await BookLog.findById(bookLogId);

        if (!endedBookLog) {
            res.status(404).json({ message: "BookLog not found" });
            return;
        }

        // Update related documents for the booklog

        for (const copyId of endedBookLog.copies) {
            // Corrected 'copy' to 'Copy' to match the model name
            const copy = await Copy.findById(copyId).exec();
            if (copy) {
                copy.availability = 'Available'; // Update copy availability
                await copy.save();
            }
        }

        // Update the status of the bookLog to returned

        endedBookLog.status = 'Returned';
        endedBookLog.actualReturnDate = Date.now();
        await endedBookLog.save();

       // End the session and return the response

       await session.commitTransaction(); // Changed to 'commitTransaction' to save changes
       session.endSession();

       res.json(endedBookLog); // Corrected 'endedBooklog' to 'endedBookLog'
    } catch (error) {
        // Error occurred while returning the booklog
        res.status(500).json({ error: 'Failed to return bookLog' }); // Changed the error message
    }
};
        

// Create and Save a new bookLog

const createLog = async (req, res) => {
    // Validate request
    if (!req.body.books) {
        return res.status(400).send({ message: "BookLog Needs A Book!" });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        console.log('Creating bookLog:', req.body);

        //Convert array of strings to array of ObjectIds
        const bookIds = req.body.books.map(bookId => {
            return new mongoose.Types.ObjectId(bookId);
        });

        const copyIds = req.body.copies.map(copyId => {
            return new mongoose.Types.ObjectId(copyId);
        });

        const userId = new mongoose.Types.ObjectId(req.body.users);

        console.log('bookIds:', bookIds);
        console.log('copyIds:', copyIds);
        console.log('userId:', userId);

        //Create a bookLog

        const bookLog = new BookLog({
            users: userId,
            checkoutDate: req.body.checkoutDate,
            returnDate: req.body.returnDate,
            email: req.body.email,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            books: [bookIds[0]], // Initialize with the first book
            copies: [copyIds[0]], // Initialize with the first copy
        });


        const createdLog = await bookLog.save();

        // Add the remaining books and copies to the bookLog
        for (let i = 1; i < bookIds.length; i++) {
            await BookLog.updateOne(
                { _id: createdLog._id },
                { $addToSet: { books: bookIds[i] } }
            );
        }

        for (let i = 1; i < copyIds.length; i++) {
            await BookLog.updateOne(
                { _id: createdLog._id },
                { $addToSet: { copies: copyIds[i] } }
            );
        }

  
        // Update related documents for each book 
        for (const bookId of req.body.books) {
            const book = await Book.findById(bookId).exec();
            if (book) {
                book.bookLog.push(createdLog._id);
                book.userLog.push(createdLog.users);
                await book.save();
                await BookLog.updateOne({ _id: createdLog._id }, { $addToSet: { books: bookId } });
            }
        }

        // Update related documents for each copy
        for (const copyId of req.body.copies) {
            const copy = await Copy.findById(copyId).exec();
            if (copy) {
                copy.bookLog.push(createdLog._id);
                copy.user.push(createdLog.users);
                copy.availability = 'Checked Out'; // Update copy availability
                await copy.save();
                await BookLog.updateOne({ _id: createdLog._id }, { $addToSet: { copies: copyId } });
            }
        }

        // Update user document
        const user = await User.findById(req.body.users).exec();
        if (user) {
            user.bookLog.push(createdLog._id);
            user.books.push(createdLog.books);
            user.copies.push(createdLog.copies);
            await user.save();
        }


        await session.commitTransaction();
        session.endSession();

        res.status(201).json(createdLog);
    } catch (error) {
        console.error("Error creating book log:", error);

        // Log more detailed information about the error
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code,
            fileName: error.fileName,
            lineNumber: error.lineNumber,
            columnNumber: error.columnNumber,
            description: error.description,
            status: error.status,
            inner: error.inner,
            // ... any other relevant properties you want to log
        });

        res.status(500).send({
            message: "Some error occurred while creating the bookLog."
        });
    }
};



// Retrieve all bookLogs from the database

const getLogs = async (req, res) => {
    try {
        // Fetch all bookLogs from the database with populated book, copies, and user fields
        const bookLogs = await BookLog.find()
            .populate('books')
            .populate('copies')
            .populate('users')
            .exec();

        res.json(bookLogs);
    } catch (error) {
        // Error occurred while fetching all bookLogs
        res.status(500).json({ error: 'Failed to fetch bookLogs' });
    }
};


// Delete a bookLog with the specified id in the request

const deleteLog = async (req, res) => {
    const bookLogId = req.params._id;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const deletedBookLog = await BookLog.findByIdAndRemove(bookLogId);

        if (!deletedBookLog) {
            res.status(404).json({ message: "BookLog not found" });
            return;
        }

        // Update related documents for each book

        for (const bookId of deletedBookLog.books) {
            const book = await Book.findById(bookId).exec();
            if (book) {
                book.bookLog.pull(deletedBookLog._id);
                book.userLog.pull(deletedBookLog.users);
                await book.save();
            }
        }

        // Update related documents for each copy
        for (const copyId of deletedBookLog.copies) {
            const copy = await Copy.findById(copyId).exec();
            if (copy) {
                copy.bookLog.pull(deletedBookLog._id);
                copy.user.pull(deletedBookLog.users);
                copy.availability = 'Available'; // Update copy availability
                await copy.save();
            }
        }

        // Update user document
        const user = await User.findById(deletedBookLog.users).exec();
        if (user) {
            user.bookLog.pull(deletedBookLog._id);
            user.books.pull(deletedBookLog.books);
            user.copies.pull(deletedBookLog.copies);
            await user.save();
        }

        await session.commitTransaction();
        session.endSession();

        res.json(deletedBookLog);
    } catch (error) {
        // Error occurred while deleting bookLog
        res.status(500).json({ error: 'Failed to delete bookLog' }); 
    }
};


// edit a bookLog with the specified id in the request

const editLog = async (req, res) => {
    const bookLogId = req.params._id;
    const updatedBookLog = req.body;

    try {
        const existingBookLog = await BookLog.findById(bookLogId).exec();

        if (!existingBookLog) {
            res.status(404).json({ message: "BookLog not found" });
            return;
        }

        const updates = {};

        // Compare fields and prepare updates accordingly
        if (existingBookLog.checkoutDate !== updatedBookLog.checkoutDate) {
            updates.checkoutDate = updatedBookLog.checkoutDate;
        }

        if (existingBookLog.returnDate !== updatedBookLog.returnDate) {
            updates.returnDate = updatedBookLog.returnDate;
        }

        if (existingBookLog.email !== updatedBookLog.email) {
            updates.email = updatedBookLog.email;
        }

        if (existingBookLog.phoneNumber !== updatedBookLog.phoneNumber) {
            updates.phoneNumber = updatedBookLog.phoneNumber;
        }

        if (existingBookLog.address !== updatedBookLog.address) {
            updates.address = updatedBookLog.address;
        }

        // Convert array of strings to array of ObjectIds
        const updatedBooks = updatedBookLog.books.map(bookId => {
            console.log('Converting bookId:', bookId);
            return new mongoose.Types.ObjectId(bookId)
        });

        if (existingBookLog.books.toString() !== updatedBooks.toString()) {
            // Update related books for the booklog


            // First find the books that were removed
            const removedBooks = existingBookLog.books.filter(book => !updatedBooks.includes(book));


            // Next find the books that were added
            const addedBooks = updatedBooks.filter(book => !existingBookLog.books.includes(book));


            // Update related books for the booklog
            await Book.updateMany(
                { _id: { $in: removedBooks } },
                { $pull: { bookLog: existingBookLog._id, userLog: existingBookLog.users } }
            );

            await Book.updateMany(
                { _id: { $in: addedBooks } },
                { $addToSet: { bookLog: existingBookLog._id, userLog: existingBookLog.users } }
            );


            // Update the book log entry itself
            updates.books = updatedBookLog.books;
        }


        // Convert array of strings to array of ObjectIds
        const updatedCopies = updatedBookLog.copies.map(copyId => {
            console.log('Converting copyId:', copyId);
            return new mongoose.Types.ObjectId(copyId)
        });

        if (existingBookLog.copies.toString() !== updatedCopies.toString()) {
            // Update related copies for the booklog


            // First find the copies that were removed
            const removedCopies = existingBookLog.copies.filter(copy => !updatedCopies.includes(copy));

            
            // Next find the copies that were added
            const addedCopies = updatedCopies.filter(copy => !existingBookLog.copies.includes(copy));

            // Remove the booklog and user entry from the removed copies and update availability
            await Copy.updateMany(
                { _id: { $in: removedCopies } },
                {
                    $pull: { bookLog: existingBookLog._id, user: existingBookLog.users },
                    $set: { availability: 'Available' }
                }
            );

            // Add the booklog and user entry to the added copies and update availability
            await Copy.updateMany(
                { _id: { $in: addedCopies } },
                {
                    $addToSet: { bookLog: existingBookLog._id, user: existingBookLog.users },
                    $set: { availability: 'Checked Out' }
                }
            );


            // Update the book log entry itself
            updates.copies = updatedBookLog.copies;
        }

        if (existingBookLog.users !== updatedBookLog.users) {
            // Update related user for the booklog

            // Update the information for the old user
            await User.findByIdAndUpdate(existingBookLog.users, {
                $pull: {
                    bookLog: existingBookLog._id,
                    books: { $in: existingBookLog.books },
                    copies: { $in: existingBookLog.copies }
                }
            });

            // Update the information for the new user
            await User.findByIdAndUpdate(updatedBookLog.users, {
                $push: {
                    bookLog: existingBookLog._id,
                    books: { $each: updatedBookLog.books },
                    copies: { $each: updatedBookLog.copies }
                }
            });


            // Update the book log entry itself
            updates.users = updatedBookLog.users;
        }


        // Apply all updates to the existing book log
        existingBookLog.set(updates);
        await existingBookLog.save();

        res.json(existingBookLog);
    } catch (error) {
        console.error("Error editing book log:", error);


        // Log more detailed information about the error
        const errorDetails = {
            message: 'Failed to edit bookLog',
            bookLogId: bookLogId,
            entityUpdated: getEntityUpdated(updatedBookLog), // Implement a function to determine the updated entity (books, copies, users)
            errorMessage: error.message,
            stackTrace: error.stack
        };


        res.status(500).json({ error: 'Failed to edit bookLog' });
    }
};

// Helper function to determine the updated entity
function getEntityUpdated(updatedBookLog) {
    if (updatedBookLog.books) {
        return 'books';
    } else if (updatedBookLog.copies) {
        return 'copies';
    } else if (updatedBookLog.users) {
        return 'users';
    } else {
        return 'unknown';
    }
}


  module.exports = {
    getLogs,
    createLog,
    deleteLog,
    editLog,
    returnLog
  };