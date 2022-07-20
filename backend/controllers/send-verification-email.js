require ('dotenv').config();
const  { createTransport } = require('nodemailer');
const bcrypt = require('bcrypt');
//user id string
const { v4 : uuidv4 } = require('uuid');
//validation model
const UserVerification =require('../models/userVerificationModel');
//create node mailer transport
const mailTransporter = createTransport({
    service : 'gmail',
    auth : {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
})

function sendVerificationEmail(req,res,{email:userEmail,_id}){
    //verification url
    const websiteUrl = req.get('origin');
    const uniqueString = uuidv4() + _id;
        //mail options
    const mailOptions={
        from: process.env.AUTH_EMAIL,
        to : userEmail,
        subject : "Verify Your email",
        html :`
        <h4>Verify your email and complete the signup process</h4>
        <p>This link expires in 6 hours</p>
        <p>click the following link to verify your email</p>
        <a href="${websiteUrl}/user/verify/${_id}/${uniqueString}/">click the following link to verify your email</a>
        `
    }
    const uniqueStringSaltRounds = 10;
    //hash unique string
    bcrypt.hash(uniqueString,uniqueStringSaltRounds)
    .then((hashedUniqueString)=>{
        //save the verification to database
        const newVerification = new UserVerification(
            {
                userId:_id,
                uniqueString: hashedUniqueString,
                expires : Date.now() + 21600000 //expires 6hrs from now
            }
        )
        newVerification.save()
        .then((result)=>{
            //send verification main using the mail options
            mailTransporter
            .sendMail(mailOptions)
            .then(()=>{
                res.json({
                    status:'PENDING',
                    message:'Verification email sent',
                    email:userEmail
                })
            })
            .catch(
                (error)=>{
                    res.json({
                        status:'FAILED',
                        message:'Verification email failed create account'
                    })
                }
            )
        }).catch((error)=>{
            res.json({
                status : 'Failed',
                message : 'Failed to create verification record'
            })
        })
    }).catch((error)=>{
        res.json({
            status : 'Failed',
            message : 'Failed to create verification id'
        })
    })
}

module.exports = sendVerificationEmail