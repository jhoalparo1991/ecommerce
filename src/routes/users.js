const { Router } = require('express');
const { findAll } = require('../controllers/users');

const routes = Router();

routes.get('/',findAll);

module.exports = routes;