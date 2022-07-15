const jwt = require('jsonwebtoken');
require('dotenv').config();
function verifyJWT(req,res,next){

    if(req.query.isDemo ==='true'){
        //if request is from demo page call next
        req.email='demo@example.com';
        next()
    }else{
        //verifyJWT
        const token = req.cookies.refreshToken;
        jwt.verify(token,process.env.JWT_REFRESH_TOKEN,(error,decoded)=>{
            if(error){
                res.status(403)
                .json({
                    message:'token not recognised please login / create account'
                })
            }else{
                req.email = decoded.email;
                next()
            }
        })

    }
}
module.exports = verifyJWT