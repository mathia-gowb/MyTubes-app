import { useContext } from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import UserContext from '../auth/AuthContext';
import LandingPage from '../pages/LandingPage';

export function RequireAuth({children}) {
    const {user}=useContext(UserContext);
    /* if user not logged in navigate to /login else to child passed in the router */
    return !user.loggedIn?<LandingPage/>:children;
}
