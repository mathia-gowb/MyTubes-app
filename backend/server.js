const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//auth vars
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//user id string
const { v4: uuidv4} = require('uuid');

require ('dotenv').config()
const saltRounds =10;
const PORT = 5000;

//mongoose connnection
/* Connect to mongoDb */
mongoose.connect('mongodb://localhost/chatapp');
mongoose.connection.once('open',function(){
    console.log('connected to the database');
}).on('error',function(error){
    console.log(error)
})
//cors setup
app.use (cors(
    {
        origin: ["http://localhost:3000"],
        methods:["GET","POST","DELETE"],
        credentials:true
    }
))
//creating of users
//user model
const User = require('./models/userModels.js');
app.get('/register',(req,res)=>{
    const {password,username,email}=req;
    //back end validation for new user information
    //hashing password
    //confirmation + waiting for confirmation
})
const app = express();
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})