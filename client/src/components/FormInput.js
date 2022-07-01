import React from 'react'

function FormInput(props) {
    const {placeholder,type,name,errorMessage,setFormValues}=props;

  return (
    <div className="input-wrapper">
        <input  type={type} placeholder={placeholder} name={name}  className={`${errorMessage?'form-error':""}`}/>
        <p className="validation-message">{errorMessage}</p>
    </div>
  )
}

export default FormInput