const { check, validationResult } = require("express-validator");
const error_handle = require("../utils/error-handle");

const validateRegister = [
  check("name")
    .notEmpty()
    .withMessage("The name is required")
    .exists()
    .withMessage("Not exist property name"),
  check("lastname")
    .notEmpty()
    .withMessage("The lastname is required")
    .exists()
    .withMessage("Not exist property lastname"),
  check("email")
    .notEmpty()
    .withMessage("The email is required")
    .exists()
    .withMessage("Not exist property email")
    .isEmail()
    .withMessage("The format email is invalid."),
  check("password")
    .notEmpty()
    .withMessage("The password is required")
    .exists()
    .withMessage("Not exist property password"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      error_handle(res, error.array(), 400);
    }
  },
];

module.exports = { validateRegister };
