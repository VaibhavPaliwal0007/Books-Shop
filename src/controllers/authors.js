const Author = require('../models/Author');

const getAuthorById = async (req, res) => {
    try {
        const _id = req.params.id;
        const author = await Author.findOne({ _id });
        
        await req.author.populate('books');

        res.status(200).send({ noOfBooks: req.author.books.length, author });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAuthors = async (req, res) => {
    try {
        for(let i = 0; i < req.authors.length; i++){
           await req.authors[i].populate('books');
        }
      
        res.status(200).send({ l : req.authors[3].books.length });
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

const getAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ _id: req.author._id });
        res.status(200).send(author);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
};

module.exports = { getAuthorById, getAuthors, getAuthor };