const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require('mongoose');
const app = express();
//env
require('dotenv').config();
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
//create the demo user
const user= require('./models/user-model');
let demoCreated = false;
if(!demoCreated){
    //check if user with demo email aleady exists
    user.findOne({email:'demo@example.com'})
    .then((results)=>{
        if(!results.length){
            const newUser =new user(
                {
                    email:'demo@example.com'
                }
            )
            newUser.save()
            .then(()=>{
                demoCreated =true;
            }).catch((err)=>{
                console.log(err)
            }) 
        }
    })
}

const UserRouter = require ('./routes/userRoutes');
const ContentRoutes = require('./routes/ContentRoutes');
const verifyJWT = require('./controllers/verifyJWT');
app.use('/user',UserRouter);
//validation middleware
app.use(verifyJWT);
app.use('/recipes',ContentRoutes);

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})