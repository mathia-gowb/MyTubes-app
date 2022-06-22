import React from 'react'

function SignUp() {
  return (

    <main class="full-screen-div auth-main-wrapper">
        <div class="overlay"></div>
        <h1 class="auth-main-header">Create Account</h1>
        <form>
            <div class="input-wrapper">
                <input type="email" placeholder="Email" name="Email" required/>
                <p class="validation-message">email must be in format abc@email.com</p>
            </div>
            <div class="input-wrapper">
                <input type="text" placeholder="Name" name="name" required/>
                <p class="validation-message">name must not contain numbers or special characters</p>
            </div>
            <div class="input-wrapper">
                <input type="password" placeholder="Password" name="password" required/>
            </div>
            <div class="input-wrapper">
                <input type="password" placeholder="Confirm Password" name="password" required/>
                <p class="validation-message">Passwords do not match</p>
            </div>
            <button class="auth-submit-button">Submit</button>
        </form>
    </main>
  )
}

export default SignUp