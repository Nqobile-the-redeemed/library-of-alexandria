// CopiesTable.js
import React from 'react';

const CopiesTable = ({ book }) => {

  //Importing copies from the store
  const copies = useSelector(state => state.copies.copies);
  const loading = useSelector(state => state.copies.loading);
  const error = useSelector(state => state.copies.error);

  return (
    <table>
      <thead>
        <tr>
          <th>Copy ID</th>
          <th>Availability</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {copies.map(copy => (
          <tr key={copy._id}>
            <td>{copy._id}</td>
            <td>{copy.availability}</td>
            {/* Add more columns as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CopiesTable;
