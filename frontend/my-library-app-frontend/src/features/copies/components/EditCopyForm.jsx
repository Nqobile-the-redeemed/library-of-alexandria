// CopyForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCopy } from '../copiesSlice';

const CopyForm = ({ initialValues, onSubmit }) => {
  const [editedCopy, setEditedCopy] = useState(initialValues);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCopy((prevCopy) => ({
      ...prevCopy,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCopy(editedCopy));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Availability:
        <input
          type="text"
          name="availability"
          value={editedCopy.availability}
          onChange={handleInputChange}
        />
      </label>
      <label>
        State:
        <input
            type="text"
            name="state"
            value={editedCopy.state}
            onChange={handleInputChange}
        />
        </label>
        <label>
        Notes:
        <input
            type="text"
            name="notes"
            value={editedCopy.notes}
            onChange={handleInputChange}
        />
        </label>
        <label>
        Issue ID:
        <input
            type="text"
            name="issueId"
            value={editedCopy.issueID}
            onChange={handleInputChange}
        />
        </label>
        
      {/* Add other form fields */}
      <button type="submit">Save</button>
    </form>
  );
};

export default CopyForm;
