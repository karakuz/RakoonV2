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
    images: {
        type: DataTypes.STRING,
    },

    prev_img: {
        type: DataTypes.STRING
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "items",
    timestamps: false
});




module.exports = Item;
