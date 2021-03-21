const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    resetPasswordLink: {
        data: String,
        default: "",
    }

}, { timestamp: true });

module.exports = mongoose.model("User", userSchema);