const Router = require('express').Router();

//auth vars
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//modules
const JsonResponse = require ('../helpers/jsonResponse');//return response object
const validationRegExps= require('../utils/validation-regexps');//contains regexps for validating inputs
const User = require('../models/user-model');//user model
const saltRounds =10;
//send verification email function
const sendVerificationEmail = require('./send-verification-email');
function RegistrationController(req,res){
    const {password,username,email}=req.body;
    //back end validation for new user information
    if(!email.match(validationRegExps.email).length){
        res.json(
            JsonResponse("FAILED","email error")
            );
    }else if(!username.match(validationRegExps.userName).length){
        res.json(
            JsonResponse("FAILED","username error")
        )
    }else if(!password.match(validationRegExps.password).length){
        res.json(
            JsonResponse("FAILED","password error")
            );
    }else{
        //if username & email & password are valid check if the user already exists
        User.findOne({email})
        .then((results)=>{

            if(results){
                res.json( 
                    JsonResponse('CONFLICT','a user with that email already exists')
                    );
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
                        //send verification email
                        sendVerificationEmail(req,res,result)
                    }).catch((error)=>{
                        console.log(error)
                        res.json(
                            //if sending of email was unsuccessful remove the user and restart the registration process 
                            JsonResponse("FAILED","there was an sending verification email")
                        );
                    })
            
                }).catch((error)=>{
                    res.json( 
                        JsonResponse("FAILED","there was an error creating the account")
                    );
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