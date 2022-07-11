import './App.css';
import './styles/auth-pages.css';
import './styles/index.css';
import './styles/main.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import UserContext from './auth/AuthContext';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerificationNotice from './pages/VerificationNotice';
import VerifyEmail from './pages/VerifyEmail';
import SingleRecipe from './pages/SingleRecipe';
import DemoParent from './components/DemoParent';
const axios = require('axios').default;
axios.defaults.withCredentials=true;


function App() {
  const [user,setUser]=useState({loggedIn:false});
  return (
    <UserContext.Provider value={{user,setUser}}>
     <Router>
        <Routes>
          {/* check login status and display landing page or videos page */}
          <Route path='/' element={user.loggedIn?<Dashboard/>:<LandingPage/>}/>
          <Route path='/signup/verification-message/:email' element={<VerificationNotice/>}/>
          <Route path='/user/verify/:userId/:uniqueString' element={<VerifyEmail/>}/>
          <Route path='login' element={user.loggedIn?<Navigate to={'/'}/>:<Login/>}></Route>
          <Route path='signup' element={user.loggedIn?<Navigate to={'/'}/>:<SignUp/>}></Route>
          <Route path='demo' element={<DemoParent/>}>
            <Route path='' element={<Dashboard/>}></Route>
            <Route path='recipe/:mealId' element={<SingleRecipe/>}></Route>
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
