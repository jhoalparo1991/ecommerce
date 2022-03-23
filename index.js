require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const mysqlConnection = require('./src/database/mysql');

// Initialization
const app = express();
mysqlConnection();
// Settings
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('combined'))

// Routes


// Starting server
app.listen(port,()=>{
    debug(`Server on port ${port}`);
});