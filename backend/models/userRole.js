const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const History = db.sequelize.define('userRole', {

    role_id: {
        type: DataTypes.INTEGER,
       allowNull: false
    },

    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    
   
}, {
    tableName: "user role",
    timestamps: false
});




module.exports = UserRole;
