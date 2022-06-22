import React from 'react'

function FormInput(props) {
  return (
    <div className="input-wrapper incorrect">
        <input  type="email" placeholder="Email" name="email" required/>
        <p className="validation-message">Email must be in format abc@email.com</p>
    </div>
  )
}

export default FormInput