// Imports
const { Router } = require("express");
const { loginController,send_mail,reset_password } = require('../controllers/auth');
const { validateLogin, validateSendEmail,validateRestorePassword } = require('../validators/user-validators');

// Initialization
const routes = Router();


// Implements routes
routes.post('/',validateLogin,loginController);
routes.post('/send-mail',validateSendEmail,send_mail);
routes.post('/reset-password',validateRestorePassword,reset_password);

// Export route
module.exports = routes;
