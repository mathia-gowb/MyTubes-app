import React from 'react'
import { Link } from 'react-router-dom'

function PasswordResetNotice(props) {
  return (
    <div style={mainWrapper}>
        <p>{props.message}</p>
        <br/>
        <button style={button}>
        <Link style ={{color:'white'}}to={`/${props.link}`} >{props.linkString}</Link>
        </button>
        
    </div>
  )
}
const mainWrapper ={
    backgroundColor:'white',
    padding:'20px 15px',
    textAlign:'center'
}
const button={
    backgroundColor:'rgb(200, 53, 78)',
    padding:'10px 20px',
}
export default PasswordResetNotice