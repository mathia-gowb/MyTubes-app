const validationRegExps= require('../utils/validation-regexps');
const JsonResponse = require ('../helpers/jsonResponse');//return response object
const ResetPasswordEmail = require ('./send-password-reset-email');
const Users = require('../models/user-model')

function RequestPasswordReset(req,res) {
    const {email}=req.body;
    if(!email.match(validationRegExps.email).length){
        res.status(400).json(
            JsonResponse("FAILED","invalid email")
            );
    }else{
        Users.findOne({email})
        .then((foundUser)=>{
            if(!foundUser){
                //do 
                res.status(400).json(
                    JsonResponse("FAILED")
                    );
            }else{
                if(!foundUser.verified){
                    //if user not verified send forbidden
                    res.status(403)
                    .json({
                        message:'your email account is not yet verified please verify before proceeding'
                    })
                }else{
                    //send verification email
                    ResetPasswordEmail(req,res,foundUser)
                }
            }
        }).catch((error)=>{

            res.status(400).json(
                JsonResponse("FAILED")
                );
        })
    }
}

module.exports = RequestPasswordReset