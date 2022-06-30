const Router = require('express').Router();
require ('dotenv').config();
//auth vars
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//creating of users
const RegistrationController = require('../controllers/registration-controller');
const VerificationController = require('../controllers/verification-controller');

Router.post('/register',RegistrationController);
Router.put('/verify',VerificationController)


module.exports = Router