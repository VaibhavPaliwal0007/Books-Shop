const express = require("express");
require("./src/db/mongoose");
const createDummyData = require("./src/data/dummy-data");

const authenticateRoute = require("./src/routes/authentication");
const authorsRoute = require("./src/routes/authors");
const booksRouter = require("./src/routes/books");

const app = express();

app.use(express.json());

createDummyData();

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/authors", authorsRoute);
app.use("/api/v1", authenticateRoute);

app.get("*", (req, res) => {
    res.status(404).send({ message: "Page not found" });
});

module.exports = app;
