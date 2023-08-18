import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

const DropDownSelector = ({ book, copies, handleCopyChange, availableCopies, selectedCopies, handleRemoveCopy}) => {

  // Retrieve the details of selected copies based on their IDs
  const selectedCopyDetails = selectedCopies.map(copyId =>
    copies.find(copy => copy._id === copyId)
  );

  return (
    <div>

        <select value="" onChange={(e) => handleCopyChange(e.target.value)}>
            <option value="" disabled>Select Copy</option>
            {availableCopies.map(copy => (
            <option key={copy._id} value={copy._id}>{copy.issueID}</option>
            ))}
        </select>
        <div className="selected-copies">
            {selectedCopyDetails.map(copy => (
            <div key={copy._id} className="selected-copy">
                <span>{copy.issueID}</span>
                <button onClick={() => handleRemoveCopy(copy._id)}>x</button>
            </div>
            ))}
        </div>

    </div>
  )
}

export default DropDownSelector