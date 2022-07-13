const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    likes: {
        type: Number,
        default: 0,
        required: true,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author",
    },
});

// bookSchema.methods.toDisplay = function (flag) {
//     const book = this;
//     const bookObject = book.toObject();

//     if(flag){
//         delete bookObject.author;
//     }

//     return bookObject;
// };

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
