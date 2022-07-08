const jwt = require('jsonwebtoken');
function verifyJWT(req,res,next){
    if(req.query.isDemo){
        //if request is from demo page call next
        req.email='demo@example.com';
        next()
    }else{
        //verifyJWT
        console.log(res)
    }
}
module.exports = verifyJWT