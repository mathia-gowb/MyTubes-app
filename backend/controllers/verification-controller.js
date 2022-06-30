const bcrypt = require('bcrypt');
const VerificationModel = require('../models/userVerificationModel');
function verifyUser(req,res){
    const {id,uniqueString}=req.body;
    //find user by id
    console.log(id)
    VerificationModel.findOne({userId:id})
    .then((results)=>{
        console.log(results)
    }).catch((error)=>{

        res.json({})
    })
}

module.exports = verifyUser