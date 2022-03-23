const { sequelize } = require('../database/mysql');
const { DataTypes } = require('sequelize');

const userModel = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    lastname:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.ENUM(['user','admin']),
        default: 'user'
    },
    deleted:{
        type: DataTypes.BOOLEAN,
        default: false,
    }
},{
    timestamp:true
});


module.exports = userModel;