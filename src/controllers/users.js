const { userModel } = require("../models");
const error_handle = require("../utils/error-handle");
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/bcryptjs");

const debug = require("debug")("app");

const findAll = async (req, res) => {
  try {
    const result = await userModel.findAll({ where: { deleted: false } });
    return res.status(200).json({ data: result });
  } catch (error) {
    debug(error.message);
  }
};

const findById = async (req, res) => {
  try {
    req = await matchedData(req);
    let { id } = req;
    id = parseInt(id);

    const user_exist = await userModel.findOne({ where: { id } });

    if (user_exist === null) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ data: user_exist });
  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

const findAllDeleted = async (req, res) => {
  try {
    const result = await userModel.findAll({ where: { deleted: true } });
    return res.status(200).json({ data: result });
  } catch (error) {
    debug(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    req = await matchedData(req);

    let { name, lastname, email, password } = req;

    const email_exist = await userModel.findOne({ where: { email: email } });

    if (email_exist !== null) {
      return res.status(200).json({ message: "This email already exist" });
    }

    password = encrypt(password);
    const newUser = new userModel({ name, lastname, email, password });

    const result = await newUser.save();

    return res.status(201).json({ result });
  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

const changeDeleted = async (req, res) => {
  try {
    req = await matchedData(req);
    let { id } = req;
    id = parseInt(id);
    const id_exist = await userModel.findOne({ where: { id } });

    if (id_exist === null) {
      return res.status(400).json({ message: "User not found" });
    }

    const delete_user = await userModel.update(
      { deleted: true },
      {
        where: { id },
      }
    );

    return res.status(200).json({ delete_user });
  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

const deleteUserFull = async (req, res) => {
  try {
    req = await matchedData(req);
    let { id } = req;
    id = parseInt(id);
    const id_exist = await userModel.findOne({ where: { id } });

    if (id_exist === null) {
      return res.status(400).json({ message: "User not found" });
    }

    const delete_user = await userModel.destroy({ where: { id } });

    return res.status(200).json({ delete_user });
  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

const updateUser = async (req, res) => {
  try {
    req = await matchedData(req);
    let { id, name, lastname, email,role } = req;
    id = parseInt(id);

    debug("ID -> ", id);

    const get_email = await userModel.findOne({ where: { id } });
    const filter_email = await userModel.findOne({ where: { email } });

    if(filter_email !== null){
        
        if ( get_email.id !== filter_email.id) {
          return res
            .status(400)
            .json({ message: "This email  exist in other user" });
        }
    }

    const update_fields = { name, lastname, email,role };

    const userEdit = await userModel.update(update_fields, { where: { id } });

    return res.status(200).json({
      message: "User updated successfully",
      data:userEdit,
    });
  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

module.exports = {
findAll,
findAllDeleted,
createUser,
changeDeleted,
deleteUserFull,
findById,
updateUser,
};
