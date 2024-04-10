// src/EditBookModal.js
import React, { useState, useEffect } from 'react';

const EditBookModal = ({ isOpen, onClose, onSubmit, book }) => {
  console.log("Book in EditBookModal: ", book);
 // Initialize state with book's properties or empty strings if book is not provided
 const [title, setTitle] = useState(book ? book.title : '');
 const [author, setAuthor] = useState(book ? book.author : '');
 const [genre, setGenre] = useState(book ? book.genre : '');

 // Use useEffect to update the state when the book prop changes
 useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
    } else {
      setTitle('');
      setAuthor('');
      setGenre('');
    }
 }, [book]);

 const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit({ title, author, genre });
 };

 if (!isOpen) return null;

 return (
    <div className="modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Author:
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </label>
          <label>
            Genre:
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          </label>
          <button type="submit">Update Book</button>
        </form>
      </div>
    </div>
 );
};

export default EditBookModal;
