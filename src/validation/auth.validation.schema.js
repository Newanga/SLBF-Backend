const { body, } = require('express-validator');
const { ROLE_COMPANY, ROLE_CITIZEN } = require('../constants/ROLES');

const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 5 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('password must be at least 5 characters long')
];

const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('email must contain a valid email address'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 characters long'),
    body('role')
        .matches(ROLE_COMPANY || ROLE_CITIZEN)
];


module.exports = {
    loginValidator,
    registerValidator
};