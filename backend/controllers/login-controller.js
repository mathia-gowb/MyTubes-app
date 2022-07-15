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
            //use an if else to check if the found user is verified then compare password
            if(foundUser.verified){
                bcrypt.compare(password,foundUser.password)
                .then((passwordsMatch)=>{

                    if(passwordsMatch){

                        //create a jwt
                        const accessToken = jwt.sign({email},process.env.JWT_SECRET,
                            {expiresIn :"10m"}
                        )
                        const refreshToken = jwt.sign({email},process.env.JWT_REFRESH_TOKEN,{expiresIn:'1y'});
                    
                        res.cookie(
                            'refreshToken',
                            refreshToken,
                            {
                                httpOnly:true,
                                maxAge:3.154e10, //1year
                                secure:true
                            }
                        )
                        .json({
                            status : 'SUCCESS',
                            message : 'login succesful',
                            accessToken
    
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
            }else{
                res.status(202)
                .json({
                    message:'please verify your account'
                })
            }

        }).catch((error)=>{
            res.status(404)
            .json({
                message: 'user with that email not found'
            })
        })
    }
};

module.exports =LoginController