const express = require('express');
const booksRouter = new express.Router();

const auth = require('../middleware/auth');
const { getAllBooks, likeBook, unlikeBook, getBooks } = require('../controllers/books');

booksRouter.get('/all', auth, getAllBooks);
booksRouter.put('/like/:id', auth, likeBook);
booksRouter.put('/unlike/:id', auth, unlikeBook);
booksRouter.get('/', auth, getBooks);

module.exports = booksRouter;