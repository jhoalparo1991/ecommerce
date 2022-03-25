// Imports
const { Router } = require("express");
const { loginController,send_mail,reset_password } = require('../controllers/auth');
const { validateLogin, validateRestorePassword } = require('../validators/user-validators');

// Initialization
const routes = Router();


// Implements routes
routes.post('/',validateLogin,loginController);
routes.post('/send-mail',validateRestorePassword,send_mail);
routes.post('/reset-password',reset_password);

// Export route
module.exports = routes;
