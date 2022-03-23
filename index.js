require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('app');
const {mysqlConnection} = require('./src/database/mysql');
const swaggerUI = require('swagger-ui-express');
const openapiSpecification = require('./src/docs/swagger');

// Initialization
const app = express();
mysqlConnection();
// Settings
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'))
app.use(express.json());
// app.use(express.urlencoded({extended: false}))

// Static files
app.use( express.static(path.join(__dirname, 'src','public','uploads')))

// Documentation
app.use('/docs',swaggerUI.serve,swaggerUI.setup(openapiSpecification));
// Routes
app.use('/api/v1',require('./src/routes'));

// Starting server

    app.listen(port,()=>{
        debug(`Server on port ${port}`);
    });
