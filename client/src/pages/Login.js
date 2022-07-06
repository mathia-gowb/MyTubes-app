import  { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../auth/AuthContext';
import FormInput from '../components/FormInput';
import { testForErrors } from '../utilities/testForErrors';
const axios = require('axios').default;
axios.defaults.withCredentials = true

function Login() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [submit,setSubmit]=useState(false);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formValues,setFormValues] = useState({
        email:'',
        password:'',
        remember:false,
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
            axios.post('http://localhost:5000/user/login',
            { 
                email : formValues.email,
                password : formValues.password,
                rememberUser : formValues.remember
            })
            .then((results)=>{
                //set login status to true
                console.log(results)
                setUser({
                    accessToken:results.data.accessToken,
                    loggedIn:true
                });
                navigate('/');
            }).catch((error)=>{
                const {status,data} =error.response
                if(status === 401){
                    console.log('yes')
                    setFormErrors((prev)=>{
                        return {...prev,password:data.message}
                    })
                }else if(status === 404){
                    setFormErrors((prev)=>{
                        return {...prev,email:data.message}
                    })
                }
                
            })
        }else{
            setIsSubmitting(false);
        }
    },[formErrors])
  return (
    <main className="full-screen-div auth-main-wrapper">
    <div className="overlay"></div>
    <h1 className="auth-main-header">Login to your account</h1>
    <form onSubmit={handleSubmit} onChange={handleInput} >
        {/* each form input component has the functionality to self validate */}

        <FormInput
            type={"email"}
            placeholder={'Enter your email'}
            name = {'email'}
            errorMessage ={ formErrors.email}
        />
        
        <FormInput
            type={"password"}
            placeholder={'Enter your password'}
            name = {'password'}
            errorMessage = { formErrors.password }//these message should be returned from backend
            /*for signup errorMessage ={ "password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"} */
        />
        <br/>
        <Link to="/reset" style={{color:'lightgreen'}}>Forgot Password ?</Link>
        <br/>
        <br/>
        <input type="checkbox" name="remember" id="remember"/>{/* end of input */}
        <label htmlFor="remember" id="remember-me-label"> Remember Me</label><br/>
        <button className="auth-submit-button">
            {isSubmitting?<span> Aunthenticating <i className="fa-solid  fa-circle-notch fa-spin"></i></span>:"submit"}
           
        </button>
    </form>
    </main>
  )
}

export default Login