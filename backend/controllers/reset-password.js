const PasswordResetRequest = require('../models/passwordResetRequest-model');
const Users = require('../models/user-model');
const bcrypt = require('bcrypt');
const { findOneAndUpdate } = require('../models/user-model');
require('dotenv').config();
function resetPassword(req,res) {

    const {password,id,uniqueString} = req.body;
    //validate 
    if(!password.match(validationRegExps.password).length){
        res.status(400)
        .json({
            message:'invalid password provided'
        })
    }else{
        PasswordResetRequest.findOne({userId:id})
        .then((foundRecord)=>{
    
            if(foundRecord){
                if(foundRecord.expires>=Date.now()){
    
                    bcrypt.compare(uniqueString,foundRecord.uniqueString)
                    .then((match)=>{
                        if(match){
                            //update the password
                            bcrypt.hash(password,10)
                            .then((hashPassword)=>{
                                Users.findOneAndUpdate({_id:id},{password:hashPassword})
                                .then((results)=>{
                                    res.json({
                                        status:'SUCCESSFUL',
                                        message:'password was successfully reset'
                                    })
                                })
                            })
                        }else{
                            //send error 400 bad request
                            res.status(400)
                            .json({
                                message:'invalid unique string provided'
                            })
                        }
                    }).catch((error)=>{
                        res.status(500)
                        .json({
                            message:'failed to verify unique string'
                        })
                    })
                }else{
                    //verification record expired
                    PasswordResetRequest.deleteOne({userId:id})
                    .then((deleted)=>{
                        res.status(410)//gone
                        .json({
                            message:'the password reset link has expired please create another password reset request'
                        })
                    })
                }
            }else{
                res.status(404)
                .json({message:'password request record not found please create a password reset request'})
            }
        })
    }


}

module.exports = resetPassword