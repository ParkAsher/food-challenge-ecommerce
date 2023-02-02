const Joi = require('joi');

// register
const userRegisterDataValidate = Joi.object({
    name: Joi.string().min(3).max(30).pattern(new RegExp('^[가-힣]*$')).required(),
    nickname: Joi.string().min(2).max(30).pattern(new RegExp('^[가-힣]*$')).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-z0-9]*$')).required(),
    passwordCheck: Joi.ref('password'),
    phone: Joi.string().length(11).pattern(new RegExp('^[0-9]*$')),
});

module.exports = {
    userRegisterDataValidate,
};