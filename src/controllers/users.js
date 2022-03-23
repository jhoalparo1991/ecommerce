const { userModel } = require('../models');
const debug = require('debug')('app');

const findAll = async (req, res) => {
    try {
        const data = await userModel.findAll();
        return res.status(200).json(data);
    } catch (error) {
        debug(error.message);
    }
}


module.exports = { 
    findAll
}