const jwt = require("jsonwebtoken");

const Author = require("../models/Author");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const author = await Author.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!author) {
            throw new Error();
        }

        req.token = token;
        req.author = author;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

module.exports = auth;
