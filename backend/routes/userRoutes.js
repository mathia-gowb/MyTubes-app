const Router = require('express').Router();
require ('dotenv').config();
//auth vars
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//creating of users
const RegistrationController = require('../controllers/registration-controller');
const VerificationController = require('../controllers/verification-controller');
const LoginController = require('../controllers/login-controller');
const verifyJWT = require('../controllers/verifyJWT');
const tokenLoginController = require('../controllers/token-login-controller');

Router.get('/',tokenLoginController)//everytime the app is loaded it will send get request;
Router.post('/register',RegistrationController);
Router.put('/verify',VerificationController)
Router.post('/login',LoginController);
Router.use(verifyJWT);
//handling the upload,delete, and accessing of files


module.exports = Router