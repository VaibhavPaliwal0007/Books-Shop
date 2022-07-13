const Author = require("../models/Author");

const getAuthorById = async (req, res) => {
    try {
        const _id = req.params.id;
        const author = await Author.findOne({ _id });
        await author.populate("books", "title ");

        res.status(200).send({ author: author, books: author.books });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        const arr = [];

        for (let i = 0; i < authors.length; i++) {
            const length = authors[i].books.length;
            // const authorData = await authors[i].populate("books", {'books': 0});

            arr.push({
                author: authors[i],
                noOfBooks: length,
            });
        }

        res.status(200).send(arr);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ _id: req.author._id });
        await author.populate("books");

        res.status(200).send({ author, books: author.books });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAllBooks = async (req, res) => {
    try {
        const authors = await Author.find({});
        const arr = [];

        // for(let idx = 0; idx < authors.length; idx++){
        //     const name = authors[idx].name;
        //     await authors[idx].populate("books");
        //     authors[idx].books.authorName = name;
        //     console.log(authors[idx].books)
        //     arr.push(authors[idx].books);
        // }

        for (let idx = 0; idx < authors.length; idx++) {
            const authorName = authors[idx].name;

            // await authors[idx].populate({
            //     path: "books",
            //     model: "Book",
            //     select: { title: 1 },
            // });

            await authors[idx].populate("books", {'author': 0, '_id': 0, '__v': 0});

            console.log(authors[idx]);

            const authorBooks = authors[idx].books;

            arr.push({ authorName, authorBooks });
        }

        res.status(200).send(arr);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getAuthorById, getAuthors, getAuthor, getAllBooks };
