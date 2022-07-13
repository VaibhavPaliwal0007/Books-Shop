const express = require("express");
require("dotenv").config();

require("./src/db/mongoose");
const createDummyData = require("./src/data/dummy-data");

const routerLogin = require("./src/routes/authentication");
const authorsRoute = require('./src/routes/authors');
const booksRouter = require("./src/routes/books");

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

// createDummyData();

app.use('/api/v1/books', booksRouter);
app.use('/api/v1/authors', authorsRoute);
app.use(routerLogin);

app.listen(port, () => console.log(`Server is up on port ${port}`));
