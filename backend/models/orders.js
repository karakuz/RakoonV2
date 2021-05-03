const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Orders = db.sequelize.define('Orders', {

    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },




}, {
    tableName: "orders",
    timestamps: false
});




module.exports = Orders;
