const { Router } = require("express");
const { findAll,createUser } = require("../controllers/users");
const { validateRegister } = require("../validators/user-validators");
const routes = Router();

/**
*Devuelve una ista de usuarios
*@openapi
*   /users:
*       get:
*           tag:
*               - users
*           summary: "get users"
*           description: "This route return list users"
*           responses:
*               200:
*                   description: "Return list user"
*               403:
*                   description: "Error getting users"
*               404:
*                   description: "Not found"
*/
routes.get("/", findAll);

routes.post("/", validateRegister,createUser);

module.exports = routes;
