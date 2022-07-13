const Author = require("../models/Author");

const getAuthorById = async (req, res) => {
    try {
        const _id = req.params.id;

        await req.author.populate("books");

        res.status(200).send({ author: req.author, books: req.author.books });
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
            await authors[i].populate("books");
            arr.push(authors[i]);
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
        res.status(200).send(author);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getAuthorById, getAuthors, getAuthor };
