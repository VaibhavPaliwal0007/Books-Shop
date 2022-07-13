const Author = require("../models/Author");

const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        const arr = [];

        for (let i = 0; i < authors.length; i++) {
            const length = authors[i].books.length;

            await authors[i].populate("likedBooks", {
                author: 0,
                __id: 0,
                __v: 0,
            });

            arr.push({
                author: authors[i].toJSON(1),
                noOfBooks: length,
            });
        }

        res.status(200).send(arr);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAuthorById = async (req, res) => {
    try {
        const _id = req.params.id;
        const author = await Author.findOne({ _id });

        if (!author) {
            res.status(404).send("Author not found");
        }

        await author.populate([
            {
                path: "likedBooks",
                select: "title",
            },
            {
                path: "books",
                select: { title: 1, author: 1, likes: 1, _id: 0 },
            },
        ]);

        res.status(200).send({ author: author, books: author.books });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ _id: req.author._id });

        await author.populate("likedBooks", {
            author: 0,
            __id: 0,
            __v: 0,
        });

        const authorDetails = author.toJSON(1);

        res.status(200).send(authorDetails);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getAuthorById, getAuthors, getAuthor };
