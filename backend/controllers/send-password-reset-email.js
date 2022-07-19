require ('dotenv').config();
const  { createTransport } = require('nodemailer');
const bcrypt = require('bcrypt');
//user id string
const { v4 : uuidv4 } = require('uuid');
//validation model
const PasswordReset =require('../models/passwordResetRequest-model');
//create node mailer transport
const mailTransporter = createTransport({
    service : 'gmail',
    auth : {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
})

function sendVerificationEmail(req,res,{email:userEmail,_id}){
    const origin = req.get('origin');

    //verification url
    const websiteUrl = `${origin}`;
    const uniqueString = uuidv4() + _id;
        //mail options
    const mailOptions={
        from: process.env.AUTH_EMAIL,
        to : userEmail,
        subject : "Reset password within 5 minutes",
        html :`
        <h4>here is the link to reset your password</h4>
        <p>This link expires in 5 minutes</p>
        <p>click the following link to verify your email</p>
        <a href="${websiteUrl}/user/reset-password/${_id}/${uniqueString}/">click the following link to password your email</a>
        `
    }
    const uniqueStringSaltRounds = 10;
    //hash unique string
    bcrypt.hash(uniqueString,uniqueStringSaltRounds)
    .then((hashedUniqueString)=>{
        //save the verification to database
        const newPasswordReset = new PasswordReset(
            {
                userId:_id,
                uniqueString: hashedUniqueString,
                expires : Date.now() + 300000 //expires 5mins from now
            }
        )
        newPasswordReset.save()
        .then((result)=>{
            //send verification main using the mail options
            mailTransporter
            .sendMail(mailOptions)
            .then(()=>{
                res.json({
                    status:'PENDING',
                    message:'password reset email sent',
                    email:userEmail
                })
            })
            .catch(
                (error)=>{
                    res.json({
                        status:'FAILED',
                        message:'failed to send password reset email'
                    })
                }
            )
        }).catch((error)=>{
            res.json({
                status : 'Failed',
                message : 'Failed to create password reset record'
            })
        })
    }).catch((error)=>{
        res.json({
            status : 'Failed',
            message : 'Failed to create password reset id'
        })
    })
}

module.exports = sendVerificationEmail