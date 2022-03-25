const { verifyToken } = require("../utils/jsonwebtoken");
const error_handle = require("../utils/error-handle");

const verifySession = (req, res, next) => {
  try {
    const data = req.headers.authorization;
    if(data){
        const token = data.split(" ").pop();
    
        if (!verifyToken(token)) {
           return res.status(401).json({ message: "Token invalid"});
        }
        return next();
    }else{
        return res.status(403).json({ message: "Don´t have access to this resource"});
    }
  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

module.exports = verifySession;
