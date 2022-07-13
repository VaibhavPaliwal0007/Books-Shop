const express = require("express");
require("dotenv").config();

require("./src/db/mongoose");
const createDummyData = require("./src/data/dummy-data");

const routerLogin = require("./src/routes/authentication");
const { getAuthorByIdRouter, getAuthorsRouter, getAuthorRouter } = require("./src/routes/authors");
const getBooksRouter = require("./src/routes/books");

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

// createDummyData();

app.use(routerLogin);
app.use(getAuthorsRouter);
app.use(getAuthorRouter);
app.use(getAuthorByIdRouter);
app.use(getBooksRouter)

app.listen(port, () => console.log(`Server is up on port ${port}`));
