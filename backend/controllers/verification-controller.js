const bcrypt = require('bcrypt');
const jsonResponse = require('../helpers/jsonResponse');
const User = require('../models/user-model');
const VerificationModel = require('../models/userVerificationModel');
function verifyUser(req,res){
    const {id,uniqueString}=req.body;
    //find user by id
    VerificationModel.findOne({userId:id})
    .then((results)=>{
        if(results){
            //the verification record exists
            //check if the record is not expired
            if(results>Date.now()){
                //the verification record hasn't expired
                const hashedUniqueString=results.uniqueString;
                bcrypt.compare(uniqueString,hashedUniqueString)
                .then((result)=>{
                    //modify the user verified status to true
                    User.updateOne({_id:id})
                    .then(()=>{
                        res.json(
                            jsonResponse("SUCCESS","your account is now verified")
                        )
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