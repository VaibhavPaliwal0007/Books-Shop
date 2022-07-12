const express = require("express");
require("dotenv").config();

require('./src/db/mongoose');
const createDummyData = require('./src/data/dummy-data');

const app = express(); 

app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

createDummyData();

app.listen(port, () => console.log(`Server is up on port ${port}`));

