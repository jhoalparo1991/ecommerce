const { Router } = require("express");
const { findAll,createUser,changeDeleted,findAllDeleted,deleteUserFull,findById,updateUser } = require("../controllers/users");
const { validateRegister,validateId,validateUpdate } = require("../validators/user-validators");
const verifySession = require("../middlewares/validate-session");
const { verifyRole } = require("../middlewares/validate-role");


const routes = Router();

/**
*Return list of users not deleted
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
routes.get("/",verifySession,verifyRole(["user","admin"]), findAll);

/**
*Return list of users deleted
*@openapi
*   /users/deleted:
*       get:
*           tag:
*               - users
*           summary: "get users deleted"
*           description: "This route return list users"
*           responses:
*               200:
*                   description: "Return list user"
*               403:
*                   description: "Error getting users"
*               404:
*                   description: "Not found"
*/
routes.get("/deleted",verifySession,verifyRole(["admin","user"]), findAllDeleted);

/**
*find user by id
*@openapi
*   /users/{id} :
*       get:
*           tag:
*               - users
*           summary: "find user"
*           description: "This route return one user"
*           parameters:
*               - name: id
*                 in: path
*                 description: Return one user
*                 schema:
*                   type: integer
*                   format: int64
*                   minimun: 1
*           responses:
*               200:
*                   description: "return one user"
*               400:
*                   description: "User not found"
*               500:
*                   description: "Error message returned"
*/
routes.get('/:id',verifySession,verifyRole(["admin","user"]),validateId,findById)

/**
*Create new user
*@openapi
*   /users:
*       post:
*           tag:
*               - users
*           summary: "create user"
*           description: "This route create new user"
*           requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#components/schemas/users'
*           responses:
*               200:
*                   description: "This email already exist"
*               201:
*                   description: "return new user created"
*               500:
*                   description: "Error message returned"
*/
routes.post("/",verifySession,verifyRole(["admin","user"]), validateRegister,createUser);

/**
*Change property deleted -> true
*@openapi
*   /users/change-deleted/{id} :
*       put:
*           tag:
*               - users
*           summary: "change property deleted"
*           description: "This route delete user only changging de value property deleted"
*           parameters:
*               - name: id
*                 in: path
*                 description: Return 1 if value was deleted
*                 schema:
*                   type: integer
*                   format: int64
*                   minimun: 1
*           responses:
*               200:
*                   description: "Property changed successfully"
*               400:
*                   description: "User not found"
*               500:
*                   description: "Error message returned"
*/
routes.put('/change-deleted/:id',verifySession,verifyRole(["admin"]),validateId,changeDeleted);

/**
*delete user
*@openapi
*   /users/{id} :
*       delete:
*           tag:
*               - users
*           summary: "delete user"
*           description: "This route delete user"
*           parameters:
*               - name: id
*                 in: path
*                 description: Return 1 if value was deleted
*                 schema:
*                   type: integer
*                   format: int64
*                   minimun: 1
*           responses:
*               200:
*                   description: "delete user successfully"
*               400:
*                   description: "User not found"
*               500:
*                   description: "Error message returned"
*/
routes.delete('/:id',verifySession,verifyRole(["admin"]),validateId,deleteUserFull)

/**
*Update user
*@openapi
*   /users/{id}:
*       put:
*           tag:
*               - users
*           summary: "update user"
*           description: "This route return user updated"
*           parameters:
*               - name: id
*                 in: path
*                 description: User for update
*                 schema:
*                   type: integer
*                   format: int64
*                   minimun: 1
*           requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                         $ref: '#components/schemas/users_edit'
*           responses:
*               200:
*                   description: "This email already exist"
*               201:
*                   description: "return user updated successfully"
*               500:
*                   description: "Error message returned"
*/
routes.put("/:id",verifySession,verifyRole(["admin"]), validateId,validateUpdate,updateUser);

module.exports = routes;
