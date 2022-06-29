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
//user model
const User = require('../models/user-model');
const saltRounds =10;
Router.post('/register',(req,res)=>{
    const {password,username,email}=req.body;
    //back end validation for new user information
    bcrypt.hash(password,saltRounds)
    .then((results)=>{
        console.log(results)
    }).catch((error)=>{
        res.json({
            status:"FAILED",
            message: "there was an error creating the account"
        })
    })
    //hashing password
    //confirmation + waiting for confirmation
})




module.exports = Router