const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const UserCart = db.sequelize.define('UserCart', {

    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },



}, {
    tableName: "users_cart",
    timestamps: false
});




module.exports = UserCart;
