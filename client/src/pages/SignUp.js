import { useEffect, useState } from 'react'
import FormInput from '../components/FormInput';
import { testForErrors } from '../utilities/testForErrors';

function SignUp() {
    const [submit,setSubmit]=useState(false);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formValues,setFormValues] = useState({
        userName:'',
        email:'',
        password:'',
        password2:'',
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
                'Password must be strong',
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
        setFormErrors((prev)=>{
            return {
                ...prev,
                email:errors.email,
                userName:errors.username,
                password:errors.password,
                password2:errors.password2
            }
        })
    }
    //submit form 
    useEffect(()=>{
        const objectValues=Object.values(formErrors).join("");
        if(objectValues.length===0 && submit){
            setIsSubmitting(true);
        }else{
            setIsSubmitting(false);
        }
    },[formErrors])
  return (

    <main class="full-screen-div auth-main-wrapper" onSubmit={handleSubmit}>
        <div class="overlay"></div>
        <h1 class="auth-main-header">Create Account</h1>
        <form>
             <FormInput
                 type={"email"}
                 placeholder={'Enter your email'}
                 name = {'email'}
                 errorMessage ={ formErrors.email}
                 setFormValues = {setFormValues}
             />
             <FormInput
                 type={"text"}
                 placeholder={'Enter you name'}
                 name = {'username'}
                 errorMessage ={ formErrors.username}
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
            <div className="input-wrapper">
                <input  type="password" placeholder="Confirm Password" name="password2" />
                <p className="validation-message">{formErrors.password2}</p>
            </div>
            <input type="checkbox" name="remember-me" id="remember-me" onChange={handleCheck}/>{/* end of input */}
            <label htmlFor="remember-me" id="remember-me-label"> Remember Me</label><br/>   
            <button class="auth-submit-button"> 
                {isSubmitting?<span> Aunthenticating <i className="fa-solid  fa-circle-notch fa-spin"></i></span>:"Submit"}
            </button>
        </form>
    </main>
  )
}

export default SignUp