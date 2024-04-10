// src/Book.js
import React from 'react';

const Book = ({ book, onEdit, onDelete }) => {
 return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td className='book-button-container'>
        <button className='book-button' onClick={() => onEdit(book._id)}>Edit</button>
        <button className='book-button' onClick={() => onDelete(book._id)}>Delete</button>
      </td>
    </tr>
 );
};

export default Book;
