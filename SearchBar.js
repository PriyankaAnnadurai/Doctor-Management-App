import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Doctor Name or Specialization"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
