import React from 'react'

function Login() {
  return (
    <main className="full-screen-div auth-main-wrapper">
    <div className="overlay"></div>
    <h1 className="auth-main-header">Login to your account</h1>
    <form>
        <div className="input-wrapper incorrect">
            <input  type="email" placeholder="Email" name="email" required/>
            <p className="validation-message">Email must be in format abc@email.com</p>
        </div>
        <div className="input-wrapper">
            <input type="password" placeholder="Password" name="password" required/>
            <p className="validation-message">Incorrect Password</p>
        </div>
        <br/>
        <input type="checkbox" name="remember-me" id="remember-me"/>
        <label for="remember-me" id="remember-me-label">Remember Me</label><br/>
        <button className="auth-submit-button">Submit</button>
    </form>
    </main>
  )
}

export default Login