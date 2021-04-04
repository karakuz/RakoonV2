const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const History = db.sequelize.define('userChart', {

    item_id: {
        type: DataTypes.INTEGER,
       allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    
   
}, {
    tableName: "user chart",
    timestamps: false
});




module.exports = userChart;
