const Author = require("../models/Author");

const signup = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).send({ message: "Author created successfully", author });
    }
    catch (e) {
        res.status(400).send(e);
    }
};

const login = async (req, res) => {
    try {
        const author = await Author.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await author.generateAuthToken();

        res.status(200).send(token);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

const updateCredentials = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        
        if(updates.length === 0){
            return res.status(400).send({ message: "No data sent" });
        }

        const allowedUpdates = ["name", "email", "password", "phoneno"];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid updates!" });
        }

        const author = await Author.findById(req.author._id);

        updates.forEach((update) => (author[update] = req.body[update]));
        await author.save();
        res.send({ message: "Credentials updated successfully" });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

const logout = async (req, res) => {
    try {
        req.author.tokens = req.author.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.author.save();
        res.send({ message: "Logged out successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

module.exports = { login, updateCredentials, logout, signup };
