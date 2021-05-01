const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Item = db.sequelize.define('Item', {

    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    item_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,

    },
    image: {
        type: DataTypes.STRING,
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    countInStock: {
        type: DataTypes.INTEGER,
    },
    brand: {
        type: DataTypes.STRING,
    },

}, {
    tableName: "items",
    timestamps: false
});




module.exports = Item;
