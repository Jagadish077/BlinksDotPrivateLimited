const { check, validationResult } = require('express-validator');

const validateUser = [
    check('firstname', 'Invalid Username')
        .trim()
        .not()
        .isEmpty()
        .isLength({min: 3})
        .isString(),
    check('lastname', 'Invalid Lastname')
        .trim()
        .not()
        .isEmpty()
        .isString(),
    check('email', 'Invalid Email Formate or Email doesnt exist')
        .trim()
        .not()
        .isEmpty()
        .normalizeEmail()
        .isEmail()
        .isString(),
    check('phone', "invalid Phone number")
        .trim()
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({max:10}),
    check('change', 'Invalid Choice')
        .trim()
        .not()
        .isEmpty()
        .isString(),
    check('message1', "invalid message")
        .trim()
        .not()
        .isEmpty()
        .isString(),

    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors.mapped());
        if(!errors.isEmpty()){
            return res.render('contactus', {layout: 'mainHome', errors: errors.mapped()})
        }
        next()
    }

]
module.exports = validateUser;