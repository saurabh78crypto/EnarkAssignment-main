// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import ReactPaginate from 'react-paginate';
import Navbar from './Navbar';
import Modal from './Modal';
import EditBookModal from './EditBookModal';

const Dashboard = () => {
 const [books, setBooks] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [currentPage, setCurrentPage] = useState(0);
 const [totalPages, setTotalPages] = useState(0);
 const [noBooksFound, setNoBooksFound] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editingBook, setEditingBook] = useState(null);

 const itemsPerPage = 10;

 const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/books', {
        params: {
          page: currentPage + 1,
          search: searchTerm,
        },
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setNoBooksFound(response.data.books.length === 0);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
 };

useEffect(() => {
    fetchBooks();
}, [currentPage, searchTerm])


 const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
 };

 const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchBooks();
 };

 const handleAddBookClick = () => {
    setIsModalOpen(true);
    setEditingBook(null);
 };

 const handleModalClose = () => {
    setIsModalOpen(false);
 };

 const handleModalSubmit = async (updatedBook) => {
    console.log("Editing book:" , editingBook);
    try {
        const response = await fetch(`http://localhost:5000/api/auth/books/${editingBook._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json();
        console.log(responseData);
        // Update the book list to reflect the changes
        setBooks(books.map(book => book._id === editingBook._id ? responseData : book));
        setIsModalOpen(false);
        fetchBooks();
     } catch (error) {
        console.error('Error updating book:', error);
     }
 };

 const handleEditBook = (bookId) => {
    const bookToEdit = books.find(book => book._id === bookId);
    console.log("Book to edit :", bookToEdit);
    setEditingBook(bookToEdit);
    setIsModalOpen(true); // Assuming you're using a single modal for both adding and editing
   };

   const handleDeleteBook = async (bookId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/auth/books/${bookId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Assuming the server responds with the deleted book's data
        const deletedBook = await response.json();
        console.log(deletedBook);

        // Remove the deleted book from the local state
        setBooks(books.filter(book => book._id !== bookId));
        setEditingBook(null);
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};





 return (
    <div className='dashboard-container'>
      <Navbar onSearch={handleSearch} onAddBookClick={handleAddBookClick}/>
      {isModalOpen && editingBook === null && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} fetchBooks={fetchBooks}/>
      )}
      {isModalOpen && editingBook !== null && (
        <EditBookModal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} book={editingBook} />
        )}
       {noBooksFound && <p>No book found.</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <Book key={book.id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook}/>
          )) || []}
        </tbody>
      </table>
      <div className='pagination-container'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
 );
};

export default Dashboard;
