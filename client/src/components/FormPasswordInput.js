import { useState } from 'react';
import PasswordInput from '../styles/PasswordInput.module.css';

function FormPasswordInput(props) {
    const {placeholder,name,errorMessage}=props;
    const [inputType,setInputType] = useState('password')
    function handleClick({target}){
        if(inputType==='password'){
            setInputType('text');
            return
        }
        setInputType('password')
    }
  return (
    <div className="input-wrapper">
        <div>
            <input  type={inputType} placeholder={placeholder} name={name}  className={`${errorMessage?'form-error':""}`}/>
            <span className={PasswordInput.button} onClick={handleClick}>show password</span>
        </div>
        <p className="validation-message">{errorMessage}</p>
    </div>
  )
}

export default FormPasswordInput