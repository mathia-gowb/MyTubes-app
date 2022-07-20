import  { useEffect, useState, useContext } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import FormPasswordInput from '../components/FormPasswordInput';
import PasswordResetNotice from '../components/PasswordResetNotice';
import { testForErrors } from '../utilities/testForErrors';
const axios = require('axios').default;
axios.defaults.withCredentials = true

function PasswordResetTokenised() {

    const navigate = useNavigate();
    const [submit,setSubmit]=useState(false);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formValues,setFormValues] = useState({
        password:'',
    })
    function handleSubmit(event){
        event.preventDefault();
        setSubmit(true);
        validate()
    }
    function handleInput({target}){
        
        setFormValues((prev)=>{
            return {...prev,[target.name]:target.value }
        }
        )
    }
    function validate(){
        //validates errors
        const errors={
            password:testForErrors(
                formValues.password,
                'password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!',
                'password',
                'required'
            )
        }
        setFormErrors((prev)=>{
            return {...prev,password:errors.password}
        })
    }
    //submit form 
    const [passwordReset,setPasswordReset] = useState({status:'pending'});
    const {userId,uniqueString}= useParams();
    useEffect(()=>{
        const objectValues=Object.values(formErrors).join("");
        if(objectValues.length===0 && submit){
            setIsSubmitting(true);
            axios.put('http://localhost:5000/user/reset-password',
            { 
                password : formValues.password,
                id:userId,
                uniqueString
            })
            .then((results)=>{
                //set login status to true
                if(results.data.status==='SUCCESSFUL'){
                    setPasswordReset({status:'successful'});
                    setIsSubmitting(false);
                }
            }).catch((error)=>{
                if(error.response.status === 410){
                    setPasswordReset({status:'failed',message:'the password link has expired please create another reset link by clicking button below'})
                    
                }else if(error.response.status === 404){
                    setPasswordReset({status:'failed',message:'reset password link invalid, please create another reset link by clicking button below'})
                }else{
                    setPasswordReset({status:'failed',message:'there was an error trying to reset your password please create a reset link by clicking button below'}) 
                }
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
        {passwordReset.status==='pending'&&<p style={{color:'white'}}>Enter your New password</p>}
          {/* each form input component has the functionality to self validate */}
        
          {passwordReset.status==='failed'&&<PasswordResetNotice link={'reset'} linkString = {"reset password"} message={passwordReset.message}/>}
          {passwordReset.status==='success'&&<PasswordResetNotice link={'login'} linkString = {"login"} message={'your password has been reset successfully please login'}/>}

          {passwordReset.status==='pending'&&<FormPasswordInput
                placeholder={'Enter your password'}
                name = {'password'}
                errorMessage = { formErrors.password }   
            >
            </FormPasswordInput>}

          {passwordReset.status==='pending'&&<button className="auth-submit-button">
              {isSubmitting?<span> resetting password <i className="fa-solid  fa-circle-notch fa-spin"></i></span>:"reset password"}
          </button>}
      </form>
      </main>
    )
}

export default PasswordResetTokenised