// CopiesTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopies } from '../copiesSlice';
import EditCopyForm from './EditCopyForm';
import CopyTableRow from './CopyTableRow';

const CopiesTable = ({ copies, copiesLoading, copiesError, book }) => {


  //Tests
  console.log(copies)


  //If loading, show loading message
  if (copiesLoading) return <div>Loading...</div>;

  //If error, show error message
  if (copiesError) return <div>Something went wrong: {error}</div>;

  //If no copies, show message
  if (copies.length === 0) return <div>No copies available</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Copy ID</th>
          <th>Availability</th>
          <th>State</th>
          <th>Notes</th>
          <th>issue ID</th>
          <th>Buttons</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
      {copies.map(copy => (
        <CopyTableRow key={copy._id} copy={copy} />
      ))}
      </tbody>
    </table>
  );
};

export default CopiesTable;
