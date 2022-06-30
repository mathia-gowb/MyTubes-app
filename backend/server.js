const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
require ('dotenv').config()
const PORT = 5000;

//mongoose connnection
/* Connect to mongoDb */
mongoose.connect('mongodb://localhost/myTubes');
mongoose.connection.once('open',function(){
    console.log('connected to the database');
}).on('error',function(error){
    console.log(error)
})
//cors setup
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true
    }
))
const UserRouter = require ('./routes/userRoutes')
app.use('/user',UserRouter)

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})