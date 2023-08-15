import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCopy, editCopy } from '../copiesSlice';
import EditCopyForm from './EditCopyForm';

const CopyTableRow = ({ copy }) => {

    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleDeleteClick = () => {
      // Show a confirmation dialog
      const confirmed = window.confirm('Are you sure you want to delete this copy?');
      if (confirmed) {
        dispatch(deleteCopy(copy._id));
      }
    };
    
    const onEditCopy = (editedCopy) => {
        dispatch(editCopy(editedCopy));
    };


    return (
      <tr>
        {isEditing ? (
          <td colSpan="6">
            <EditCopyForm
              initialValues={copy}
              onSubmit={(editedCopy) => {
                setIsEditing(false);
                onEditCopy(editedCopy);
              }}
            />
          </td>
        ) : (
          <>
            <td>{copy._id}</td>
            <td>{copy.availability}</td>
            <td>{copy.state}</td>
            <td>{copy.notes}</td>
            <td>{copy.issueID}</td>
            <td>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </td>
          </>
        )}
      </tr>
    );
  };

export default CopyTableRow