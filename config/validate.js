const { check, validationResult } = require('express-validator');

const validateUser = [
    check('firstname')
        .trim()
        .not()
        .isEmpty()
        .isLength({min: 3})
        .isString()
        .withMessage('Invalid Username'),
    check('lastname')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Lastname'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .normalizeEmail()
        .isEmail()
        .isString()
        .withMessage('Invalid Email Formate or Email doesnt exist'),
    check('phone')
        .trim()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:10})
        .withMessage('invalid Phone Number'),
    check('change')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Choice'),
    check('message1')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .withMessage("invalid message"),

    (req, res, next) => {
        next()
    }

]
module.exports = validateUser;