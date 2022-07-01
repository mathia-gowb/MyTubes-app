import './App.css';
import './styles/auth-pages.css';
import './styles/index.css';
import './styles/main.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import UserContext from './auth/AuthContext';
import { useEffect, useState } from 'react';
import Videos from './pages/Videos';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerificationNotice from './pages/VerificationNotice';
import VerifyEmail from './pages/VerifyEmail';
const axios = require('axios').default;
axios.defaults.withCredentials=true;


function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  useEffect(()=>{
    axios.get('http://localhost:5000/user/login')
    .then((response)=>{
      //set logged in status to true
      console.log(response)
    })
  },[])
  return (
    <UserContext.Provider value={{loggedIn,setLoggedIn}}>
     <Router>
        <Routes>
          {/* check login status and display landing page or videos page */}
          <Route path='/' element={loggedIn?<Videos/>:<LandingPage/>}/>
          <Route path='/signup/verification-message/:email' element={<VerificationNotice/>}/>
          <Route path='/user/verify/:userId/:uniqueString' element={<VerifyEmail/>}/>
          <Route path='login' element={loggedIn?<Navigate to={'/'}/>:<Login/>}></Route>
          <Route path='signup' element={loggedIn?<Navigate to={'/'}/>:<SignUp/>}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
