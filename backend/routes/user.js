const express = require('express');
const {login,register} = require('../controllers/user.controller')
const registerUser = express.Router();

registerUser.post('/sign-in',register);
registerUser.post('/login',login);

module.exports= registerUser;