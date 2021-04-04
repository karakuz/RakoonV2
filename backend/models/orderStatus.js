const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Item = db.sequelize.define('Order Status', {

    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: "order_status",
    timestamps: false
});




module.exports = OrderStatus;
