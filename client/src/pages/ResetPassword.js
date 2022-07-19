import  { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../auth/AuthContext';
import FormInput from '../components/FormInput';
import FormPasswordInput from '../components/FormPasswordInput';
import { testForErrors } from '../utilities/testForErrors';
const axios = require('axios').default;
axios.defaults.withCredentials = true

function ResetPassword() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [submit,setSubmit]=useState(false);
    const [formErrors,setFormErrors] = useState({verification:''});
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formValues,setFormValues] = useState({
        email:'',
    })
    function handleSubmit(event){
        event.preventDefault();
        setSubmit(true);
        validate()
    }
    function handleInput({target}){
        
        let targetValue=target.name==="remember"?target.checked:target.value;
        setFormValues((prev)=>{
            return {...prev,[target.name]:targetValue }
        }
        )
    }
    function validate(){
        //validates errors
        const errors={
            email:testForErrors(
                formValues.email,
                'Please enter a valid email address !',
                'email',
                'required'
            )
        }
        setFormErrors((prev)=>{
            return {...prev,email:errors.email,password:errors.password}
        })
    }
    //submit form 
    const [emailSent,setEmailSent] = useState(false);
    useEffect(()=>{
        const objectValues=Object.values(formErrors).join("");
        if(objectValues.length===0 && submit){
            setIsSubmitting(true);
            axios.post('http://localhost:5000/user/reset-password',
            { 
                email : formValues.email,
                password : formValues.password,
            })
            .then((results)=>{
                //set login status to true
                if(results.data.status==='PENDING'){
                    setEmailSent(true);
                    setIsSubmitting(false);
                }

            }).catch((error)=>{

            })
        }else{
            setIsSubmitting(false);
        }
    },[formErrors])
  return (
    <main className="full-screen-div auth-main-wrapper">
    <div className="overlay"></div>
    <h1 className="auth-main-header">Reset Password</h1>
    <form onSubmit={handleSubmit} onChange={handleInput} >
        <p style={{color:'white'}}>Please enter the email you used to register your account</p>
        {/* each form input component has the functionality to self validate */}
        {formErrors.verification&&<p style={{backgroundColor:'white',fontSize:'14px',padding:'5px',color:'red'}}>{formErrors.verification}</p>}
        {emailSent&&<p style={{backgroundColor:'white',fontSize:'14px',padding:'8px',color:'green', marginTop:'8px'}}>We have sent an email to {formValues.email} check your email for password reset link</p>}

        {!emailSent&&<FormInput
            type={"email"}
            placeholder={'Enter your email'}
            name = {'email'}
            errorMessage ={ formErrors.email}
        />}

        {!emailSent&&<button className="auth-submit-button">
            {isSubmitting?<span> please Wait <i className="fa-solid  fa-circle-notch fa-spin"></i></span>:"reset password"}
           
        </button>}
    </form>
    </main>
  )
}

export default ResetPassword