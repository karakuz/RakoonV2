const { Store } = require("express-session");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const History = db.sequelize.define('Store', {

    store_id: {
        type: DataTypes.INTEGER,
       allowNull: false
    },

    store_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

  
    
   
}, {
    tableName: "store",
    timestamps: false
});




module.exports = Store;
