const { Router } = require('express');

const routes = Router();

routes.get('/',(req,res) => {
    res.send('User work')
})

module.exports = routes;