const express = require('express');

const routes = express();

routes.use('/users',require('./users'));
routes.use('/auth',require('./auth'));

module.exports = routes;