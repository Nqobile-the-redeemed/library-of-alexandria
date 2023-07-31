import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBook } from '../bookSlice';
import { uploadImage } from "../services/uploadImage"

export const BookDetails = ({ book }) => {

  //The variose States
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedDescription, setEditedDescription] = useState(book.description);
  const [editedTags, setEditedTags] = useState(book.tags); // Added state for tags
  const [isSaving, setIsSaving] = useState(false); // Added state for saving/loading
  const [editedSsid, setEditedSsid] = useState(book.ssid); // Added state for ssid
  const [editedCategory, setEditedCategory] = useState(book.category); // Added state for category
  const [error, setError] = useState(null); // Added state for error handling
  const [selectedImage, setSelectedImage] = useState(null);


  //The variouse imports
  const dispatch = useDispatch();


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
          setEditedTags(book.tags); // Reset edited values
        })
        .catch((error) => {
          console.log(error);
          setIsSaving(false);
          setError('Failed to save changes. Please try again.');
        });
    }

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
