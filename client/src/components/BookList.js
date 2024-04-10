import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
 const [books, setBooks] = useState([]);
 const [error, setError] = useState(null);

 useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/books');
        setBooks(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooks();
 }, []);

 if (error) return <div>Error: {error}</div>;

 return (
    <div>
      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 );
};

export default BookList;
