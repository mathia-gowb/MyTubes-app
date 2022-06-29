require ('dotenv').config();
import { createTransport } from 'nodemailer';
import { hash } from 'bcrypt';
//user id string
import { v4 as uuidv4 } from 'uuid';
//validation model
import UserVerification from '../models/userVerificationModel';
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
    const websiteUrl = "http://localhost:3000/";
    const uniqueString = uuidv4() + userId;
        //mail options
    const mailOptions={
        from: process.env.AUTH_EMAIL,
        to : userEmail,
        subject : "Verify Your email",
        html :`
        <h4>Verify your email and complete the signup process</h4>
        <p>Link expires in 6 hours</p>
        <p>click the following link to verify your email</p>
        <a href="${websiteUrl}/user/verify/${_id}/${uniqueString}/">click the following link to verify your email</a>
        `
    }
    const uniqueStringSaltRounds = 10;
    //hash unique string
    hash(uniqueString,uniqueStringSaltRounds)
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