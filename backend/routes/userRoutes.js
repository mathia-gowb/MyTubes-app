const Router = require('express').Router();
require ('dotenv').config();
//auth vars
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//user id string
const { v4: uuidv4} = require('uuid');

//creating of users
const RegistrationController=require('../controllers/registration-controller')
Router.post('/register',RegistrationController)




module.exports = Router