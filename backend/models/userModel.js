const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema =new ({
    name:String,
    email:String,
    password:String,
})

const User = mongoose.model("user",userSchema);
module.exports = User;