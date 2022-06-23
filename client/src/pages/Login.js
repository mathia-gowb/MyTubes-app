import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { testForErrors } from '../utilities/testForErrors';

function Login() {
    const [submit,setSubmit]=useState(false);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formValues,setFormValues] = useState({
        email:'',
        password:'',
        rememberUser:false,
    })
    function handleSubmit(event){
        event.preventDefault();
        setSubmit(true);
        validate()
    }
    function handleCheck(){
        setFormValues((prev)=>{
            return {...prev,rememberUser:!prev.rememberUser}
        })
    }
    
    function validate(){
        //validates errors
        const errors={
            email:testForErrors(
                formValues.email,
                'Please enter a valid email address !',
                'email',
                'required'
            ),
            password:testForErrors(
                formValues.password,
                '',
                'password',
                'required'
            )
        }
        setFormErrors((prev)=>{
            return {...prev,email:errors.email,password:errors.password}
        })
    }
    //submit form 
    useEffect(()=>{
        const objectValues=Object.values(formErrors).join("");
        if(objectValues.length===0 && submit){
            setIsSubmitting(true);
            setTimeout(function(){
                setFormErrors((prev)=>{
                    return {...prev,password:"Password and email do not match"}
                })
            },2000)
        }else{
            setIsSubmitting(false);
        }
    },[formErrors])
  return (
    <main className="full-screen-div auth-main-wrapper">
    <div className="overlay"></div>
    <h1 className="auth-main-header">Login to your account</h1>
    <form onSubmit={handleSubmit} >
        {/* each form input component has the functionality to self validate */}

        <FormInput
            type={"email"}
            placeholder={'Enter your email'}
            name = {'email'}
            errorMessage ={ formErrors.email}
            setFormValues = {setFormValues}
        />
        
        <FormInput
            type={"password"}
            placeholder={'Enter your password'}
            name = {'password'}
            errorMessage = { formErrors.password }//these message should be returned from backend
            /*for signup errorMessage ={ "password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"} */
            setFormValues = {setFormValues}
        />
        <br/>
        <Link to="/reset" style={{color:'lightgreen'}}>Forgot Password ?</Link>
        <br/>
        <br/>
        <input type="checkbox" name="remember-me" id="remember-me" onChange={handleCheck}/>{/* end of input */}
        <label for="remember-me" id="remember-me-label"> Remember Me</label><br/>
        <button className="auth-submit-button">
            {isSubmitting?<span> Aunthenticating <i className="fa-solid  fa-circle-notch fa-spin"></i></span>:"submit"}
           
        </button>
    </form>
    </main>
  )
}

export default Login