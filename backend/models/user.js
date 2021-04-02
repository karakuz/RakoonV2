const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.sequelize.define('User', {

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    e_mail: {
        type: DataTypes.STRING,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
    },

    reset_token: {
        type: DataTypes.STRING
    },

    role_id: {
        type: DataTypes.INTEGER
    },

    is_verified: {
        type: DataTypes.INTEGER
    },
    auth: {
        type: DataTypes.STRING
    }
}, {
    tableName: "users",
    timestamps: false
});




module.exports = User;






/* const mongoose = require('mongoose');
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

module.exports = mongoose.model("User", userSchema); */