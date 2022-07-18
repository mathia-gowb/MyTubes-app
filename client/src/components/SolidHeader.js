import SolidHeaderStyles from '../styles/SolidHeader.module.css'
import SearchBar from './SearchBar'
function SolidHeader(props) {

    return (
        <header id="solid-header">
            <nav className={SolidHeaderStyles.solidHeaderNav}>
                <p className={SolidHeaderStyles.textLogo}>Name</p>
                <button className={SolidHeaderStyles.logOutButton}>Logout</button>
            </nav>
            {props.showSearch&&<SearchBar/>}
        </header>
    )
}

export default SolidHeader