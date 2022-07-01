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

Router.post('/register',RegistrationController);
Router.put('/verify',VerificationController)
Router.post('/login',LoginController);
Router.get('/login',(req,res)=>{
    console.log(req.headers['authorization'])
})//everytime the app is loaded it will send get request;
Router.use(verifyJWT);
//handling the upload,delete, and accessing of files


module.exports = Router