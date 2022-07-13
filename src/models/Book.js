const mongoose = require('mongoose');

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

    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Author'
    }
}, { timestamps: true });

bookSchema.methods.toJSON = function () {
    const book = this;
    const bookObject = book.toObject();

    delete bookObject.author;

    return bookObject;
}

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
