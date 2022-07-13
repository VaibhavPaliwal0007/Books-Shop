const Book = require("../models/Book");
const Author = require("../models/Author");

const getAllBooks = async (req, res) => {
    try {
        const books = await await Book.find().populate({
            path: "author",
            select: { name: 1, _id: 0 },
        });

        if (req.query.sortByLikes == "desc") {
            books.sort((a, b) => b.likes - a.likes);
        } else if (req.query.sortByLikes == "asc") {
            books.sort((a, b) => a.likes - b.likes);
        }

        res.status(200).send(books);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getBooks = async (req, res) => {
    try {
        const authors = await Author.find({});
        const arr = [];

        for (let idx = 0; idx < authors.length; idx++) {
            await authors[idx].populate("books", { _id: 0, __v: 0 });

            const authorBooks = authors[idx].books;

            for (let curr = 0; curr < authorBooks.length; curr++) {
                await authorBooks[curr].populate({
                    path: "author",
                    select: { name: 1, _id: 0 },
                });
            }
            arr.push(...authorBooks);
        }

        if (req.query.sortByLikes == "desc") {
            arr.sort((a, b) => b.likes - a.likes);
        } else if (req.query.sortByLikes == "asc") {
            arr.sort((a, b) => a.likes - b.likes);
        }

        res.status(200).send(arr);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const likeBook = async (req, res) => {
    try {
        const author = req.author;
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).send("Book not found");
        }

        book.likes++;

        if (author.likedBooks.includes(book._id)) {
            return res.status(400).send("You already liked this book");
        }

        author.likedBooks.push(book._id);
        await book.save();
        await author.save();

        res.status(200).send(book);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const unlikeBook = async (req, res) => {
    try {
        const author = req.author;
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).send("Book not found");
        }

        const index = author.likedBooks.indexOf(book._id);

        if (index === -1) {
            return res.status(400).send("You have not liked this book");
        }

        author.likedBooks.splice(index, 1);
        book.likes--;
        await book.save();
        await author.save();

        res.status(200).send(book);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getBooks, likeBook, unlikeBook, getAllBooks };
