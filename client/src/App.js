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
import { RequireAuth } from './components/RequireAuth';
import DashboardParent from './components/DashboardParent';
import Page404 from './pages/404';
const axios = require('axios').default;
axios.defaults.withCredentials=true;


function App() {
  const userSchema = {
    loggedIn:false,
    isDemo:false,
    likedRecipes:[],
    savedRecipes:[]
  }
  const [user,setUser]=useState(userSchema);
  
  return (
    <UserContext.Provider value={{user,setUser}}>
     <Router>
        <Routes>
          {/* check login status and display landing page or videos page */}
          {/* <Route path='/' element={<LandingPage/>}/> */}
          <Route path='/' element={<RequireAuth><DashboardParent/></RequireAuth>}>
            <Route path='' element={<Dashboard/>}></Route>
            <Route path='recipe' element={<SingleRecipe/>}></Route>
          </Route>
          <Route path='/signup/verification-message/:email' element={<VerificationNotice/>}/>
          <Route path='/user/verify/:userId/:uniqueString' element={<VerifyEmail/>}/>
          <Route path='login' element={user.loggedIn?<Navigate to={'/'}/>:<Login/>}></Route>
          <Route path='signup' element={user.loggedIn?<Navigate to={'/'}/>:<SignUp/>}></Route>
          <Route path='demo' element={<DashboardParent/>}>
            <Route path='' element={<Dashboard/>}></Route>
            <Route path='recipe' element={<SingleRecipe/>}></Route>
          </Route>
          <Route path="*" element={<Page404/>}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
