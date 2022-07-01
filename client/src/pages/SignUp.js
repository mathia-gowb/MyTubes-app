import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { testForErrors } from '../utilities/testForErrors';
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function SignUp() {
    const navigate = useNavigate();
    const [submit,setSubmit]=useState(false);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formValues,setFormValues] = useState({
        username:'',
        email:'',
        password:'',
        password2:'',
        remember:false,
    })
    function comparePasswords(testPassword){
        return formValues.password === testPassword
    }
    function handleInput({target}){
        
        let targetValue=target.name==="remember"?target.checked:target.value;
        setFormValues((prev)=>{
            return {...prev,[target.name]:targetValue }
        }
        )
    }
    function handleSubmit(event){
        event.preventDefault();
        setSubmit(true);
        validate()
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
                'password between 8 to 15 characters which contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit, and 1 special character',
                'password',
                'required'
            ),
            password2:testForErrors(
                formValues.password2,
                '',
                'password',
                'required'
            )
            ,
            username:testForErrors(
                formValues.username,
                'User name must not contain any special characters',
                'userName',
                'required'
            )
        }
        if(!comparePasswords(formValues.password2)){
            errors.password2="Passwords do not match"
        }
        setFormErrors((prev)=>{
            return {...prev,...errors }
        })
    }
    function handlePasswordCompare({target}){
        //for updating the validity of password 2 as the user types it
            setFormErrors((prev)=>{
                return {...prev,password2:!comparePasswords(target.value)?'Passwords do not match':"" }
            })
    }
    
    
    //submit form 
    useEffect(()=>{
        const objectValues=Object.values(formErrors).join("");
        console.log(objectValues)
        if(objectValues.length===0 && submit){
            setIsSubmitting(true);
            axios.post(
                'http://localhost:5000/user/register'
                ,{
                    username : formValues.username,
                    email: formValues.email,
                    password: formValues.password
                }
            ).then((response)=>{
                console.log(response.data)
                if(response.data.status === "PENDING"){
                    //navigate to the notice screen
                    navigate(`/signup/verification-message/${response.data.email}`)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            setIsSubmitting(false);
        }
    },[formErrors,submit])
  return (

    <main class="full-screen-div auth-main-wrapper" >
        <div class="overlay"></div>
        <h1 class="auth-main-header">Create Account</h1>
        <form onSubmit={handleSubmit} onChange={handleInput}>
             <FormInput
                 type={"email"}
                 placeholder={'Enter your email'}
                 name = {'email'}
                 errorMessage ={ formErrors.email}
             />
             <FormInput
                 type={"text"}
                 placeholder={'Enter you name'}
                 name = {'username'}
                 errorMessage ={ formErrors.username}
             />
            <FormInput
                handleChange={handlePasswordCompare}
                type={"password"}
                placeholder={'Enter your password'}
                name = {'password'}
                errorMessage = { formErrors.password }//these message should be returned from backend
                /*for signup errorMessage ={ "password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"} */
            />
            <div className="input-wrapper">
                <input  type="password" placeholder="Confirm Password" name="password2" onChange={handlePasswordCompare} />
                <p className="validation-message">{formErrors.password2}</p>
            </div>
            <input type="checkbox" name="remember" id="remember"/>{/* end of input */}
            <label htmlFor="remember" id="remember-me-label"> Remember Me</label><br/>   
            <button class="auth-submit-button"> 
                {isSubmitting?<span> Creating Account <i className="fa-solid  fa-circle-notch fa-spin"></i></span>:"Submit"}
            </button>
        </form>
    </main>
  )
}

export default SignUp