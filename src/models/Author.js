const mongoose = require("mongoose");
const validator = require("validator");

const Book = require('./Book');

const jwt = require('jsonwebtoken')

const authorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },

        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("123") || value.toLowerCase().includes("0000")) {
                    throw new Error("Please enter a strong password!!");
                }
            },
        },

        phoneNo: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
        },

        isLike: {
            type: Boolean,
            default: false,
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: false,
                },
            },
        ],

        books: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }],
    },
    { timestamps: true }
);

// authorSchema.virtual('books', {
//     ref: 'Book',
//     localField: "_id",
//     foreignField: "author",
// });

authorSchema.methods.generateAuthToken = async function() {
    const author = this;

    const token = jwt.sign({ _id: author._id.toString() }, process.env.JWT_SECRET);

    author.tokens = author.tokens.concat({ token });
    await author.save();

    return token;
};

authorSchema.statics.findByCredentials = async function(email, password) {
     const author = await Author.findOne({ email });

     if(!author) {
         throw new Error("Unable to login");
     }

     if(author.password !== password) {
         throw new Error("Unable to login");
     }

     return author;
};


const Author = mongoose.model("Author", authorSchema);

module.exports = Author;