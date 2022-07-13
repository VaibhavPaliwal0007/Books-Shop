const express = require("express");

const authorsRoute = new express.Router();

// const getAuthorByIdRouter = new express.Router();
// const getAuthorsRouter = new express.Router();
// const getAuthorRouter = new express.Router();
// const getBooksRouter = new express.Router();

const { getAuthorById, getAuthors, getAuthor, getAllBooks } = require("../controllers/authors");
const auth = require("../middleware/auth");

// getAuthorsRouter.get("/authors", auth, getAuthors);
// getAuthorRouter.get("/authors/me", auth, getAuthor);
// getAuthorByIdRouter.get("/authors/:id", auth, getAuthorById);
// getBooksRouter.get("/books/", auth, getAllBooks);

authorsRoute.get("/authors", auth, getAuthors);
authorsRoute.get("/authors/me", auth, getAuthor);
authorsRoute.get("/authors/:id", auth, getAuthorById);
authorsRoute.get("/books/", auth, getAllBooks);


// module.exports = { getAuthorByIdRouter, getAuthorsRouter, getAuthorRouter, getBooksRouter };
module.exports = authorsRoute;
 