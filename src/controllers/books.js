const Book = require('../models/Book');

const getBooks = async (req, res) => {
    try {
        const books = await (await Book.find().populate('author'));

        res.status(200).send(books);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = getBooks;

