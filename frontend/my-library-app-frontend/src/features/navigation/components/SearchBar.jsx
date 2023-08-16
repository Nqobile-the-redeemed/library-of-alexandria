import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 

const SearchBar = ({searchQuery, setSearchQuery, handleSearch}) => {


  return (
    <div>
        <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
            onClick={() => handleSearch(searchQuery)}
        >
            Search
        </button>
    </div>
  )
}

export default SearchBar