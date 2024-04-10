// src/Navbar.js
import React from 'react';

const Navbar = ({ onSearch, onAddBookClick }) => {
 return (
    <nav>
      <div className="navbar-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            onChange={onSearch}
          />
        </div>
            <button className="add-book-btn" onClick={onAddBookClick}>Add Book</button>
      </div>
    </nav>
 );
};

export default Navbar;
