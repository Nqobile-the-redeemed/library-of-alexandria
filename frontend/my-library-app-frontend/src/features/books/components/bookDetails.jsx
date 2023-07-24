import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

    //create a state for the edited book
    const editedBook = {
      ...book,
      title: editedTitle,
      author: editedAuthor,
      description: editedDescription,
    };


  }



  return (
    <div>bookDetails</div>
  )
}
