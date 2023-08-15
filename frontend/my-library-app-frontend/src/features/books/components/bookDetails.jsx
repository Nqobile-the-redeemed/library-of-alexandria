import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBook } from '../bookSlice';
import { uploadImage } from "../services/uploadImage"
import CopiesTable from '../../copies/components/copiesTable';
import NewCopyForm from '../../copies/components/newCopyForm';
import { fetchCopies } from '../../copies/copiesSlice';
import TransactionsTable from '../../transactions/components/TransactionsTable';
import NewTransactionForm from '../../transactions/components/NewTransactionForm';

export const BookDetails = ({ book, copies, copiesLoading, copiesError, transactions, transctionsLoading, transactionsError }) => {


  //The variose States
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title || ''); // Initialize to an empty string
  const [editedAuthor, setEditedAuthor] = useState(book.author || ''); // Initialize to an empty string
  const [editedDescription, setEditedDescription] = useState(book.description || ''); // Initialize to an empty string
  const [editedTags, setEditedTags] = useState(book.tags || ""); // Initialize to an empty array
  const [isSaving, setIsSaving] = useState(false);
  const [editedSsid, setEditedSsid] = useState(book.ssid || ''); // Initialize to an empty string
  const [editedCategory, setEditedCategory] = useState(book.category || ''); // Initialize to an empty string
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [transactionModalState, setTransactionModalState] = useState(false);

  //The variouse imports
  const dispatch = useDispatch();

  //Tests
  console.log(copies)


  //The variouse handleclick functions
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // update the book
  const handleSaveClick = () => {
    setIsSaving(true); // Set saving state to true

 

    //create a state for the edited book
    const editedBook = {
      ...book,
      title: editedTitle,
      author: editedAuthor,
      description: editedDescription,
      tags: editedTags, // Added tags to edited book
      ssid: editedSsid, // Added ssid to edited book
      category: editedCategory // Added category to edited book
    };

    if (selectedImage) {
      const formData = new FormData();
      formData.append('bookCover', selectedImage);
  
      uploadImage(formData)
        .then((response) => {
          console.log(response);
          editedBook.bookCover = response;
          console.log(editedBook);

         const  alphaOmegaHolder = {
            bookId: book._id,
            bookData: editedBook
          }

          dispatch(editBook(alphaOmegaHolder));
        })
        .then(() => {
          setIsEditing(false);
          setIsSaving(false);
          setError(null);
          setEditedTitle(book.title); // Reset edited values
          setEditedAuthor(book.author);
          setEditedDescription(book.description);
          setEditedTags(book.tags); // Reset edited values
          setEditedCategory(book.category); // Reset edited values
          setEditedSsid(book.ssid); // Reset edited values
        })
        .catch((uploadError) => {
          console.log(uploadError);
          setIsSaving(false);
          setError('Failed to upload image. Please try again.');
        });
    } else {

      const  alphaOmegaHolder = {
        bookId: book._id,
        bookData: editedBook
      }

      dispatch(editBook(alphaOmegaHolder))
        .then(() => {
          setIsEditing(false);
          setIsSaving(false);
          setError(null);
          setEditedTitle(book.title); // Reset edited values
          setEditedAuthor(book.author);
          setEditedDescription(book.description);
          setEditedTags(book.tags); // Reset edited values
          setEditedCategory(book.category); // Reset edited values
          setEditedSsid(book.ssid); // Reset edited values
        })
        .catch((error) => {
          console.log(error);
          setIsSaving(false);
          setError('Failed to save changes. Please try again.');
        });
    }

  }
  
//Handle the creation of a new copy
  const handleCreateCopy = () => {

    setModalState(true);

  }


//Handle the creation of a new transaction
  const handleCreateTransaction = () => {

    setTransactionModalState(true);

  }


//Handle the change of images
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };



  return (
    <div className="book-details">
      <img src={book.bookCover} alt={book.title} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <input
            type="text"
            value={editedSsid}
            onChange={(e) => setEditedSsid(e.target.value)}
          />
          <textarea
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
          />
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.description}</p>
          <p>{book.ssid}</p>
          <p>{book.category}</p>
          <div className="tags-container">
            {(editedTags.split(',').map((tag) => tag.trim())).map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          </div>
        </>
      )}
      {isEditing ? (
        <>
          {isSaving ? (
            <button className="save-btn" disabled>
              Saving...
            </button>
          ) : (
            <button className="save-btn" onClick={handleSaveClick}>
              Save
            </button>
          )}
        </>
      ) : (
        <button className="edit-btn" onClick={handleEditClick}>
          Edit
        </button>
      )}
      <button className="delete-btn">Delete</button>
      {error && <p className="error">{error}</p>}
      {/* Add more book details as needed */}
      <div className="copies-container">
        <h3>Copies</h3>
        <button 
          className="add-btn"
          onClick={handleCreateCopy}
        >Add</button>
        <NewCopyForm book = {book} modalState = {modalState} setModalState = {setModalState} />
        <CopiesTable book = {book} copies={copies} copiesError={copiesError} copiesLoading={copiesLoading} />
      </div>
      <div className="transactions-container">
        <h3>Transactions</h3>
        <button 
          className="add-btn"
        >Add</button>
        <NewTransactionForm book = {book} transactionModalState = {transactionModalState} setTransactionModalState = {setTransactionModalState} />
        <TransactionsTable transactions={transactions} transactionsError={transactionsError} transactionsLoading={transactionsLoading} />
      </div>
    </div>
   
  )
}
