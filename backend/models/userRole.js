const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const UserRole = db.sequelize.define('UserRole', {

    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },



}, {
    tableName: "user_role",
    timestamps: false
});




module.exports = UserRole;
