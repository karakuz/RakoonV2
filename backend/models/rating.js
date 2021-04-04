const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const History = db.sequelize.define('History', {

    rating_id: {
        type: DataTypes.INTEGER,
       allowNull: false
    },

    Comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    is_verified: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
   
}, {
    tableName: "rating",
    timestamps: false
});




module.exports = rating;
