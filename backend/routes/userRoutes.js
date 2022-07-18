const Router = require('express').Router();
require ('dotenv').config();
//auth vars

const bcrypt = require('bcrypt');

//creating of users
const RegistrationController = require('../controllers/registration-controller');
const VerificationController = require('../controllers/verification-controller');
const LoginController = require('../controllers/login-controller');
const LogoutController = require('../controllers/logout-controller');

const tokenLoginController = require('../controllers/token-login-controller');

Router.get('/',tokenLoginController)//everytime the app is loaded it will send get request;
Router.post('/register',RegistrationController);
Router.post('/login',LoginController);
Router.put('/verify',VerificationController)
Router.put('/logout',LogoutController)
//handling the upload,delete, and accessing of files


module.exports = Router