const express = require('express');
const getBooksRouter = new express.Router();

const auth = require('../middleware/auth');
const getBooks = require('../controllers/books');

getBooksRouter.get('/api/v1/books', auth, getBooks);

module.exports = getBooksRouter;