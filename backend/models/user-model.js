const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema =new Schema({
    userName:String,
    email:String,
    password:String,
    verified : {type : Boolean , default : false}
})

const User = mongoose.model("user",userSchema);
module.exports = User;