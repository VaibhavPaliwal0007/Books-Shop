const express = require('express');
const getAllBooksRouter = new express.Router();

const auth = require('../middleware/auth');
const getBooks = require('../controllers/books');

getAllBooksRouter.get('/api/v1/books/all', auth, getBooks);

module.exports = getAllBooksRouter;