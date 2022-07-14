const bcrypt = require('bcrypt');
const jsonResponse = require('../helpers/jsonResponse');
const User = require('../models/user-model');
const VerificationModel = require('../models/userVerificationModel');
const jwt = require('jsonwebtoken');
function verifyUser(req,res){
    const {id,uniqueString}=req.body;
    //find user by id
    VerificationModel.findOne({userId:id})
    .then((results)=>{
        if(results){
            //the verification record exists
            const verificationRecord = results;
            //check if the record is not expired
            if(verificationRecord.expires>Date.now()){
                //the verification record hasn't expired
                const hashedUniqueString=verificationRecord.uniqueString;
                bcrypt.compare(uniqueString,hashedUniqueString)
                .then((results)=>{
                    //modify the user verified status to true
                    User.findOneAndUpdate({_id:id},{verified:true})
                    .then((foundUser)=>{
                        //create jwt token and session
                        req.session.user = foundUser;
                        const userEmail = foundUser.email;
                        const token=jwt.sign({userEmail},process.env.JWT_SECRET,{
                            expiresIn:300,
                            //if verification record had have rememberUser = true chooose a longer time
                        })
                        //delete record then send token to front end
                        VerificationModel.deleteOne({userId:id})
                        .then(()=>{
                            //send the token and data to the frontend
                            res.cookie('refreshToken',token,{httpOnly:true,maxAge:30*24*60*60*1000})
                            .json(
                                jsonResponse("SUCCESS","your account is now verified")
                            )
                        }).catch((error)=>{
                            res.json(
                                jsonResponse("FAILED","failed to delete verification record")
                            )
                        })

                    }).catch(()=>{
                        res.json(
                            jsonResponse("FAILED","failed to verify account try clicking the confirm button again")
                        )
                    })
                    //delete the record
                }).catch((error)=>{
                    console.log(error)
                })
            }else{
                //verification record
                VerificationModel.deleteOne({id})
                .then((results)=>{
                    //delete user
                    User.deleteOne({_id:id})
                    .then((results)=>{
                        res.json(
                            jsonResponse("FAILED",'the verification link has expired please register your account')
                        )
                    }
                    ).catch((results)=>{
                        res.json(
                            jsonResponse("FAILED",'failed to modify user')
                        )
                    })
                }).catch(()=>{
                    res.json(
                        jsonResponse("FAILED",'failed to modify verification record')
                    )
                })
            }//end of checking the expiry of record

        }else{
            //the verification record doesn't exist // return message and ask the user to login
            res.json(
                {
                    redirect:'/signup'
                }
            )
        }
    }).catch((error)=>{
        
        res.json(
            jsonResponse("FAILED","an error occurred while trying to get the verification record")
        )
    })
}

module.exports = verifyUser