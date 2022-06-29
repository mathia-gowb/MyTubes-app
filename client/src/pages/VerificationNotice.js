import React from 'react'
import {useParams} from 'react-router-dom';
function VerificationNotice() {
    const {email:userEmail} = useParams();
  return (
    
    <main class="full-screen-div auth-main-wrapper" >
        <div class="overlay"></div>
        <div className="verification-box" style={styles}>
            <h1>Verify Email</h1>
            <br/>
            <p>We have sent a verification email to<span style={{color:' rgb(200, 53, 78)',fontWeight:'bold'}}> {userEmail}</span> check your inbox and finalise the registration process </p>
        </div>

    </main>
  )
}
const styles ={
    color:'rgb(5, 3, 30)',
    width:'80%',
    maxWidth: 400,
    margin:'0 auto',
    textAlign:'center',
    backgroundColor:'white',
    padding:'40px 10px'
}
export default VerificationNotice