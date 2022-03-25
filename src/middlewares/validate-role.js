const { verifyToken } = require("../utils/jsonwebtoken");
const error_handle = require("../utils/error-handle");
const debug = require("debug")("app");


const verifyRole = role =>(req, res, next) => {
  try {
    const data = req.headers.authorization;
    const token = data.split(" ").pop();
    const rol = verifyToken(token).role;
    const contain_role = role.includes( rol );

    if(contain_role){
      return next();
    }
    return res.status(401).json({
      message: "Don´t have permission for this resource"
    })

  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

module.exports = {verifyRole};
