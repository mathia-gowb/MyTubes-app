import React, { useContext } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import UserContext from '../auth/AuthContext';
const axios = require('axios').default;
axios.defaults.withCredentials = true;

function VerifyEmail() {
    const {userId,uniqueString} = useParams();
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    function handleSubmit(){
        axios.put('http://localhost:5000/user/verify/',
            {
                id:userId,
                uniqueString
            }
        )
        .then((results)=>{
            console.log(results.data.status)
            if(results.data.status === 'SUCCESS'){
                setUser((prev)=>{
                    return {...prev,accessToken:results.data.accessToken,loggedIn:true}
                });
                navigate('/');
            }
        })
    }

    return (
      <main class="full-screen-div auth-main-wrapper" >
          <div class="overlay"></div>
          <div className="verification-box" style={verificationBoxStyles}>
              <h1>Welcome!</h1>
              <br/>
              <p>
                  We're excited to have you get started, first you need to confirm your account. just click the button below to confirm your account
              </p>
              <button style={buttonStyles} onClick={handleSubmit}>Confirm your account</button>
          </div>

      </main>
    )
}
const verificationBoxStyles ={
    color:'rgb(5, 3, 30)',
    width:'80%',
    maxWidth: 400,
    margin:'0 auto',
    textAlign:'center',
    backgroundColor:'white',
    padding:'45px 15px',
    borderRadius:'5px'
}
const buttonStyles={
    backgroundColor:"rgb(200, 53, 78)",
    fontSize:'16px',
    fontWeight:'bold',
    color:'white',
    padding:'10px 20px',
    marginTop:'20px'
}
export default VerifyEmail