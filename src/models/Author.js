const mongoose = require("mongoose");
const validator = require("validator");

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
                if (
                    value.toLowerCase().includes("123") ||
                    value.toLowerCase().includes("0000")
                ) {
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

        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;