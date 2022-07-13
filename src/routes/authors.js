const express = require("express");

const authorsRoute = new express.Router();

const { getAuthorById, getAuthors, getAuthor } = require("../controllers/authors");
const auth = require("../middleware/auth");

authorsRoute.get("/", auth, getAuthors);
authorsRoute.get("/me", auth, getAuthor);
authorsRoute.get("/:id", auth, getAuthorById);

module.exports = authorsRoute;
 