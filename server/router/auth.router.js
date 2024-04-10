import express from "express";
import { addBook, deleteBook, getBook, updateBook } from "../controller/auth.controller";

const auth = express.Router()

auth.get('/books', getBook)
auth.post('/addbook', addBook)
auth.put('/books/:_id', updateBook)
auth.delete('/books/:_id', deleteBook)

export {auth}