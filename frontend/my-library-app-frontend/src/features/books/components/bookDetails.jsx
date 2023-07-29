import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { editBook } from '../bookSlice';
import { editBook, omegaUpdater } from '../bookSlice';
import { uploadImage } from '../services/uploadImage';

export const BookDetails = ({ book }) => {

  //The variose States
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedDescription, setEditedDescription] = useState(book.description);
  const [isSaving, setIsSaving] = useState(false); // Added state for saving/loading
  const [error, setError] = useState(null); // Added state for error handling
  const [selectedImage, setSelectedImage] = useState(null);


  //The variouse imports
  const dispatch = useDispatch();


  //The variouse handleclick functions
  const handleEditClick = () => {
    setIsEditing(true);
  };


//Saving changes to book form

const handleSaveClick = () => {
  setIsSaving(true); // Set saving state to true

  const editedBook = {
    ...book,
    title: editedTitle,
    author: editedAuthor,
    description: editedDescription,
  };

  const omegaForm = new FormData();
  omegaForm.append('bookCover', selectedImage);
  omegaForm.append('bookId', book._id); // bookId is the ID of the book you want to update
  omegaForm.append('bookData', JSON.stringify( editedBook )); // updatedBookData is the updated book data as an object

  const gigaHolder = {
    dataForm: omegaForm,
    bookId: book._id,
  };

  const omegaHolder = {
    bookData: editedBook,
    bookId: book._id,
  };

console.log('selectedImage:', selectedImage);
console.log('formData:', omegaForm);
console.log('gigaHolder:', gigaHolder);

// Log the key/value pairs
for (var pair of omegaForm.entries()) {
  console.log(pair[0]+ ' - ' + pair[1]); 
}

  // dispatch(omegaUpdater(payload))
  // dispatch(editBook(omegaHolder))
  dispatch(omegaUpdater(gigaHolder))
    .then(() => {
      setIsEditing(false);
      setIsSaving(false);
      setError(null);
      setEditedTitle(book.title); // Reset edited values
      setEditedAuthor(book.author);
      setEditedDescription(book.description);
    })
    .catch((uploadError) => {
      console.log(uploadError);
      setIsSaving(false);
      setError('Failed to upload image. Please try again.');
    });
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
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.description}</p>
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
    </div>
  )
}
