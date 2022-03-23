const { userModel } = require('../models');
const error_handle = require('../utils/error-handle');
const { matchedData } = require('express-validator');


const debug = require('debug')('app');

const findAll = async (req, res) => {
    try {
        const data = await userModel.findAll();
        return res.status(200).json(data);
    } catch (error) {
        debug(error.message);
    }
}

const createUser = async (req,res) => {
   try {
    req = await matchedData(req);
    
    const { name,lastname,email,password,role } = req;

    const email_exist = await userModel.findOne({ where : {email : email}});
    
    if(email_exist !== null) {
        return res.status(200).json({message:'This email already exist'});
    }

    const newUser = new userModel({name,lastname,email,password,role});

    const result = await newUser.save();

    return res.status(201).json({result});
    
   } catch (error) {
       error_handle(res,error.message,500);
   }
}

module.exports = {
    findAll,
    createUser
}