const express = require("express");

const getAuthorByIdRouter = new express.Router();
const getAuthorsRouter = new express.Router();
const getAuthorRouter = new express.Router();

const { getAuthorById, getAuthors, getAuthor } = require("../controllers/authors");
const auth = require("../middleware/auth");

getAuthorsRouter.get("/api/v1/authors", auth, getAuthors);
getAuthorRouter.get("/api/v1/authors/me", auth, getAuthor);
getAuthorByIdRouter.get("/api/v1/authors/:id", auth, getAuthorById);

module.exports = { getAuthorByIdRouter, getAuthorsRouter, getAuthorRouter };
 