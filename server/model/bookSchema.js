import mongoose from "mongoose";

const bookSchema = new mongoose.Schema ({
    title : {
        type: 'String',
        required: true
    }, 
    author : {
        type: 'String',
        required: true
    },
    genre : {
        type: 'String',
        required: true
    },
});


const Book = mongoose.model('BOOK', bookSchema);
module.exports = Book;


