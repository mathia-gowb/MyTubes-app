const jwt = require('jsonwebtoken');
require('dotenv').config();

function tokenLoginController(req,res){
    const token = req.cookies.JWT;
    jwt.verify(token,process.env.JWT_SECRET,(error,response)=>{
        if(error){
            //delete cookie
           console.log(error,response.email);

        }else{
            console.log(response)
        }
    })

}
module.exports = tokenLoginController