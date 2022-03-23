const { Router } = require("express");
const { findAll } = require("../controllers/users");

const routes = Router();

/**
 * find all users
 * @openapi
 *  /user:
 *      get:
 *          sumary: find all users
 *          description: return a list of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/users'
 *          requestBody:
 *              
 *          responses:
 *              '201': 'Return list of users'
 */
routes.get("/", findAll);

module.exports = routes;
