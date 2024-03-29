const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    userId: String,
    uniqueString : String,
    created : {type:Date,default:Date.now()},
    expires : Date,
    rememberUser:{type:Boolean,default:false}

})


const userVerificationModel = mongoose.model('user verification model', userVerificationSchema)
module.exports = userVerificationModel