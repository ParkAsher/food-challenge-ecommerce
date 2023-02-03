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

// login
const userLoginDataValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
});

// get user id
const getUserIdDataValidate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

// update password
const userUpdatePasswordDataValidate = Joi.object({
    id: Joi.number().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-z0-9]*$')).required(),
    passwordCheck: Joi.ref('password'),
});

// get email
const userGetEmailDataValidate = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
});

module.exports = {
    userRegisterDataValidate,
    userLoginDataValidate,
    getUserIdDataValidate,
    userUpdatePasswordDataValidate,
    userGetEmailDataValidate,
};
