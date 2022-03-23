const express = require('express');

const routes = express();

routes.use('/user',require('./users'));

module.exports = routes;