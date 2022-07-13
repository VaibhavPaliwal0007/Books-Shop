const Author = require("../models/Author");

const login = async (req, res) => {
    try {
        const author = await Author.findByCredentials(req.body.email, req.body.password);
        const token = await author.generateAuthToken();
        
        res.status(200).send(token);
    } 

    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

module.exports = { login };
