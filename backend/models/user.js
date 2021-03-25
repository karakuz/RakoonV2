const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    surname: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: { type: String, default: "" },
    resetPasswordExpires: { type: Date, default: Date.now },
    roleId: { type: Number }

}, { timestamp: true });

module.exports = mongoose.model("User", userSchema);