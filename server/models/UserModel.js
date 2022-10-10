const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    tokenString: {
        type: String,
        required: false,
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = User;