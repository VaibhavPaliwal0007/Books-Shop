const mongoose = require("mongoose");
require('dotenv').config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
    }
})();
