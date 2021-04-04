const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const History = db.sequelize.define('History', {

    Date: {
        type: DataTypes.DATE,
       allowNull: false
    },

    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    rating_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

   
}, {
    tableName: "history",
    timestamps: false
});




module.exports = history;
