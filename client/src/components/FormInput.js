import React from 'react'

function FormInput(props) {
    const {placeholder,type,name,errorMessage,setFormValues}=props;
    function handleInput({target}){
        setFormValues((prev)=>{
            return {...prev,[target.name]:target.value }
        }
        )
    }
  return (
    <div className="input-wrapper">
        <input  type={type} placeholder={placeholder} name={name} onChange={handleInput}/>
        <p className="validation-message">{errorMessage}</p>
    </div>
  )
}

export default FormInput