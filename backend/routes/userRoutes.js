const Router = require('express').Router();
require ('dotenv').config();
//auth vars

const bcrypt = require('bcrypt');

//creating of users
const RegistrationController = require('../controllers/registration-controller');
const VerificationController = require('../controllers/verification-controller');
const LoginController = require('../controllers/login-controller');
const LogoutController = require('../controllers/logout-controller');
const RequestPasswordReset = require('../controllers/RequestPasswordReset');
const tokenLoginController = require('../controllers/token-login-controller');
//get request
Router.get('/',tokenLoginController)//everytime the app is loaded it will send get request;
//post requests
Router.post('/reset-password',RequestPasswordReset)
Router.post('/register',RegistrationController);
Router.post('/login',LoginController);
//put request
const ResetPassword = require('../controllers/reset-password');
Router.put('/reset-password',ResetPassword);
Router.put('/verify',VerificationController);
Router.put('/logout',LogoutController);
//handling the upload,delete, and accessing of files


module.exports = Router