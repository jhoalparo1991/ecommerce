const express = require('express');

const routes = express();

routes.use(require('./users'));

module.exports = routes;