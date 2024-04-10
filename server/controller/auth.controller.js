const Book = require('../model/bookSchema')

// Get all books
const getBook = async (req, res) => {
    try {
        const { page = 1, search = '' } = req.query;
        const itemsPerPage = 10;
        const offset = (page - 1) * itemsPerPage;

        // If search term is provided, filter books based on the search term
        // Otherwise, return all books
        const query = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { genre: { $regex: search, $options: 'i' } }

            ]
        } : {};

        const totalBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / itemsPerPage);

        const books = await Book.find(query)
            .skip(offset)
            .limit(itemsPerPage)
            .exec();

        res.status(200).json({
            books,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Add a new book
const addBook = async (req, res) => {
    try {
        const {title, author, genre} = req.body;
        const bookExist = await Book.findOne({ title: title });
        if(bookExist != null){
            res.status(422).json({
                message: 'Book already exists'
            })
        }
        const data = new Book({
            title : title,
            author : author,
            genre : genre, 
        });
        const savedBook = await data.save();
        return res.json({
            statuscode : 200,
            book: savedBook,
            message : "Book added successfully"
        })
    } catch (error) {
        return res.json({
            statuscode : 500,
            message : error.message
        })
    }
};

// Update an existing book
const updateBook = async (req, res) => {
    try {
        const updateBook = await Book.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true })
        res.status(200).json(updateBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params._id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export { getBook, addBook, updateBook, deleteBook};