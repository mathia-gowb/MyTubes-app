const User = require('../models/user-model');
const validationRegExps = require('../utils/validation-regexps');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
function LoginController(req,res){
    const {password,email,rememberUser}=req.body;
    //back end validation for new user information
    if(!email.match(validationRegExps.email).length){
        res.json(
            JsonResponse("FAILED","please use a valid email")
            );
    }else{
        //find user with that email
        User.findOne({email}).
        then((foundUser)=>{
            bcrypt.compare(password,foundUser.password)
            .then((passwordsMatch)=>{

                if(passwordsMatch){
                    //create a jwt
                    const token = jwt.sign({email},process.env.JWT_SECRET,
                        {expiresIn : 300}
                    )
                    const cookieAge = rememberUser?30*24*60*60*1000:24*60*60*1000//if remember me true keep cookie for 30-days
                    res.cookie('JWT',token,{httpOnly:true,maxAge:cookieAge})
                    .json({
                        status : 'SUCCESS',
                        message : 'login succesful'
                    })
                }else{
                    res.status(401)
                    .json(
                        {
                          message: 'password/email do not match'
                        }
                    )
                }
            })
        }).catch((error)=>{
            res.status(404)
            .json({
                message: 'user with that email not found'
            })
        })
    }
};

module.exports =LoginController