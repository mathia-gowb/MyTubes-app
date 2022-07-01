const User = require('../models/user-model');
const validationRegExps = require('../utils/validation-regexps')
function LoginController(req,res){
    console.log(req.body)
    const {password,email,rememberUser}=req.body;
    //back end validation for new user information
    if(!email.match(validationRegExps.email).length){
        res.json(
            JsonResponse("FAILED","email error")
            );
    }else if(!password.match(validationRegExps.password).length){
        res.json(
            JsonResponse("FAILED","password error")
            );
    }else{
        //find user with that email
        User.findOne({email}).
        then((foundUser)=>{
            console.log(foundUser)
        }).catch((error)=>{
            res.json(
                {
                    status:'FAILED',
                    message: 'Failed to search for user'
                }
            )
        })
    }
};

module.exports =LoginController