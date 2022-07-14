import { useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/videos/background-video.mp4';
import UserContext from '../auth/AuthContext';
const axios = require('axios').default;
axios.defaults.withCredentials=true;

function LandingPage(props) {
  const {setUser} = useContext(UserContext);
  useEffect(()=>{
    //try to get current user
    axios.get('http://localhost:5000/user')
    .then((res)=>{
      //if user found set the login status to true
      if(res.data.status==='SUCCESSFUL'){
        setUser((prev)=>{
          return {...prev,loggedIn:true}
        })
      } 
    })
  },[])
  return (
    <main class="Landing-page full-screen-div">
    <video id="background-video"  src={backgroundVideo}  autoPlay loop muted  type="video/mp4">
    </video>
    <div class="overlay"></div>
    <div class="hero-content">
        <h1 class="hero-heading">save your favourite recipes for your next meal</h1>
        <div class="auth-buttons">
          <p style={{width:"80%",maxWidth:"300px",color:"white",margin:"auto"}}>
            To view demo of this website without loging in press this 
            <Link to="demo" style={{color:"green",fontWeight:"bold"}}> link </Link>
          </p>
          <br/>
          <br/>
          <br/>
          <Link to={'/login'}>
              <button class="login-button">Login</button>
          </Link>
          <Link to={'/signup'}>
              <button class="create-account-button">Create Account</button>
          </Link>

        </div>
    </div>
    </main>
  )
}

export default LandingPage