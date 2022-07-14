const jwt = require('jsonwebtoken');
require('dotenv').config();
const user = require('../models/user-model')
function tokenLoginController(req,res){

    const token = req.cookies.refreshToken;
    jwt.verify(token,process.env.JWT_REFRESH_TOKEN,(error,response)=>{
        if(error){
            //respond with a status 403(forbidden) and delete cookie
           res.status(403)
           .clearCookie('refreshToken')
        }else{
            //get user to check if the user exists
            user.findOne({email:response.email})
            .then((user)=>{
                if(user&&user.verified){
                    res.json({
                        status:'SUCCESSFUL',
                        message:'login successful'
                    })
                }else{
                    //respond with a status 403(forbidden) 
                    res.status(403);
                }
            })
        }
    })

}
module.exports = tokenLoginController