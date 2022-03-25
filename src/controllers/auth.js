const { compare } = require("../utils/bcryptjs");
const { userModel } = require("../models");
const { matchedData } = require("express-validator");
const error_handle = require("../utils/error-handle");
const { registerToken } = require('../utils/jsonwebtoken');
const debug = require('debug')('app');
const nodemailer = require('nodemailer');

const loginController = async (req, res) => {
  try {
    req = matchedData(req);

    const { email, password } = req;

    const email_exist = await userModel.findOne({ where: { email } });

    if (email_exist === null) {
      return res.status(400).json({ message: "Error email" });
    }

    const passwordHash = email_exist.password;

    if(!compare(password, passwordHash)){
        return res.status(400).json({ message: "Error password" });
    }
    const token = registerToken(email_exist);
   
    return res.json({token});


  } catch (error) {
     error_handle(res, error.message, 500);
  }
};

const send_mail = async(req,res)=>{
  try {

    req = matchedData(req);
    const { email } = req;

      const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: process.env.NODEMAILER_SECURE,
        auth:{
          user:process.env.NODEMAILER_USER,
          pass:process.env.NODEMAILER_PASS,
        }
      })

      // debug(transporter)

      await transporter.sendMail({
          from:process.env.NODEMAILER_USER,
          to:email,
          subject:"change password",
          text:"Change password of your account in Ecommerce App",
          html:`
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Cmabio de clave</title>
          </head>
          <body>
              <h1>Cambio de clave</h1>
              <p>Este mensaje fue enviado desde la aplicacion de Ecommerce</p>
              <p>Haga click en el siguiente enlace para hacer el proceso de cambio de calve</p>
              <a href='http://localhost:5000/api/v1/auth/reset-password'>Change password</a>
              <footer>
                  <p>Jhonatan Padilla Rovira</p>
                  <p>&copy; Todos los derechos reservados 2022</p>
              </footer>
          </body>
          </html>
          
          `
      },(err,data) => {
        if(err){
          return res.status(400).json({
            message: err
          })
        }
        return res.status(200).json({
          message: data
        })
      })

  } catch (error) {
    error_handle(res, error.message, 500);
  }
};

const reset_password = async(req,res) => {
  try {
      res.send('Change password received');
  } catch (error) {
    error_handle(res, error.message, 500);
  }
}

module.exports = { loginController,send_mail,reset_password };
