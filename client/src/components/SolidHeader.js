import { useContext } from 'react';
import SolidHeaderStyles from '../styles/SolidHeader.module.css';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import UserContext from '../auth/AuthContext';
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function SolidHeader(props) {
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext);

    function clickHandler(){
        axios.put('http://localhost:5000/user/logout',{})
        .then((res)=>{
            setUser((prev)=>{
                return {...prev,loggedIn:false}
            })
            navigate('/')
        }).catch((error)=>{

        })
    }
    return (
        <header id="solid-header">
            <nav className={SolidHeaderStyles.solidHeaderNav}>
                <p className={SolidHeaderStyles.textLogo}>Name</p>
                {!props.isDemo&&<button className={SolidHeaderStyles.logOutButton} onClick={clickHandler}>Logout</button>}
            </nav>
            {props.showSearch&&<SearchBar/>}
        </header>
    )
}

export default SolidHeader