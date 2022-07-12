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

    author: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
