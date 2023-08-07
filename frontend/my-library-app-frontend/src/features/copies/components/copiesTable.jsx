// CopiesTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCopies } from '../copiesSlice';

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
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {copies.map(copy => (
          <tr key={copy._id}>
            <td>{copy._id}</td>
            <td>{copy.availability}</td>
            <td>{copy.state}</td>
            <td>{copy.notes}</td>
            {/* Add more columns as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CopiesTable;
