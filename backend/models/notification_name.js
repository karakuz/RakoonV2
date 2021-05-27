const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const NotificationName = db.sequelize.define('NotificationName', {

    idnotification_name: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    notification_body: {
        type: DataTypes.STRING,
        allowNull: false
    }



}, {
    tableName: "notification_name",
    timestamps: false
});




module.exports = NotificationName;
