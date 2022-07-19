const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordResetSchema = new Schema({
    userId:String,
    uniqueString : String,
    created : {type:Date,default:Date.now()},
    expires : Date,
    rememberUser:{type:Boolean,default:false}
})

const passwordResetModel = mongoose.model('reset password', passwordResetSchema)
module.exports = passwordResetModel;