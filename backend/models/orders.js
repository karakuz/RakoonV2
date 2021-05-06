const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Orders = db.sequelize.define('Orders', {

    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },



    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
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
