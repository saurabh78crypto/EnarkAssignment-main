import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit, fetchBooks }) => {
 if (!isOpen) {
    return null;
 }

 const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData); // Convert FormData to a regular object

    try {
        const response = await fetch('http://localhost:5000/api/auth/addbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert the object to a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // Parse the JSON response
        console.log(responseData); // Log the response for debugging
        onSubmit(data); // Call the onSubmit prop function with the form data
        onClose(); // Close the modal after successful submission
        fetchBooks();
    } catch (error) {
        console.error('Error adding book:', error);
        // Optionally, display an error message to the user
    }
 };

 return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" required />
          </label>
          <label>
            Author:
            <input type="text" name="author" required />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" required />
          </label>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
 );
};

export default Modal;
