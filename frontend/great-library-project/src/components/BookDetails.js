import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBook } from '../actions/booksActions';
import { uploadImage } from '../services/bookServices/uploadService';

const BookDetails = ({ book }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedDescription, setEditedDescription] = useState(book.description);
  const [isSaving, setIsSaving] = useState(false); // Added state for saving/loading
  const [error, setError] = useState(null); // Added state for error handling
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const fileURL = useSelector((state) => state.fileURL);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsSaving(true); // Set saving state to true
  
    const editedBook = {
      ...book,
      title: editedTitle,
      author: editedAuthor,
      description: editedDescription,
    };
  
    if (selectedImage) {
      const formData = new FormData();
      formData.append('bookCover', selectedImage);
  
      (uploadImage(formData))
        .then((response) => {
          console.log(response);
          editedBook.bookCover = response;
          console.log(editedBook);
          dispatch(editBook(book._id, editedBook));
        })
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
    } else {
      dispatch(editBook(book._id, editedBook))
        .then(() => {
          setIsEditing(false);
          setIsSaving(false);
          setError(null);
          setEditedTitle(book.title); // Reset edited values
          setEditedAuthor(book.author);
          setEditedDescription(book.description);
        })
        .catch((error) => {
          console.log(error);
          setIsSaving(false);
          setError('Failed to save changes. Please try again.');
        });
    }
  };
  
 

  
  

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
  );
};


export default BookDetails;
