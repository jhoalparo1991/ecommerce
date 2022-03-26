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

const validateUpdate = [
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
  check("role")
    .notEmpty()
    .withMessage("The role is required")
    .exists()
    .withMessage("Not exist property role"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      error_handle(res, error.array(), 400);
    }
  },
];


const validateLogin = [
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

const validateSendEmail = [
  check("email")
    .notEmpty()
    .withMessage("The email is required")
    .exists()
    .withMessage("Not exist property email")
    .isEmail()
    .withMessage("The format email is invalid."),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      error_handle(res, error.array(), 400);
    }
  },
];

const validateRestorePassword = [
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
    check("password_repet")
    .notEmpty()
    .withMessage("The password-repet is required")
    .exists()
    .withMessage("Not exist property password-repet"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      error_handle(res, error.array(), 400);
    }
  },
];

const validateId = [
  check("id")
    .notEmpty()
    .withMessage("The id is required")
    .exists()
    .withMessage("Not exist property id"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      error_handle(res, error.array(), 400);
    }
  },
];

module.exports = { validateRegister, validateId, validateUpdate,validateLogin,validateSendEmail,validateRestorePassword };
