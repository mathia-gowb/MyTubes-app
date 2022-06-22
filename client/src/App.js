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
import { useState } from 'react';
import Videos from './pages/Videos';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [loggedIn,setLoggedIn]=useState(false)
  return (
    <UserContext.Provider value={{loggedIn,setLoggedIn}}>
     <Router>
        <Routes>
          {/* check login status and display landing page or videos page */}
          <Route path='/' element={loggedIn?<Videos/>:<LandingPage/>}/>
          <Route path='login' element={loggedIn?<Navigate to={'/'}/>:<Login/>}></Route>
          <Route path='signup' element={loggedIn?<Navigate to={'/'}/>:<SignUp/>}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
