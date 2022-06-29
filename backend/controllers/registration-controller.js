const Router = require('express').Router();

//auth vars
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//files
const validationRegExps= require('../utils/validation-regexps')
const User = require('../models/user-model');
const saltRounds =10;

function RegistrationController(req,res){
    const {password,username,email}=req.body;
    //back end validation for new user information
    if(!email.match(validationRegExps.email).length){
        res.json({
            status:"FAILED",
            message: "email error"
        })
    }else if(!username.match(validationRegExps.userName).length){
        res.json({
            status:"FAILED",
            message: "username error"
        })
    }else if(!password.match(validationRegExps.password).length){
        res.json({
            status:"FAILED",
            message: "password error"
        })
    }else{
        //if username & email & password are valid check if the user already exists
        User.findOne({email})
        .then((results)=>{

            if(results){
                res.json({
                    status : 'CONFLICT',
                    message : 'a user with that email already exists'
                })
            }else{
                bcrypt.hash(password,saltRounds)
                .then((hashPassword)=>{
                    const newUser = new User({
                        userName :username,
                        email,
                        password : hashPassword
            
                    })
                    //save the user
                    newUser.save()
                    .then((result)=>{
                        res.json({
                            status:"PENDING",
                            message: "Account created please verify your email to finalise the registration process"
                        })
                    }).catch((error)=>{
            
                    })
            
                }).catch((error)=>{
                    res.json({
                        status:"FAILED",
                        message: "there was an error creating the account"
                    })
                })
            }

        }).catch((error)=>{
            console.log(error)
        })

    }

    //hashing password
    //confirmation + waiting for confirmation
}
module.exports = RegistrationController