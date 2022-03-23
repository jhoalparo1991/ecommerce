const express = require('express');

const routes = express();

routes.use('/users',require('./users'));

module.exports = routes;