import React from 'react';
import Button  from './login_button.svg';
import {Link} from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link to='/login' style={{color: "grey", height: "100%", display: "flex", alignItems: "center", cursor: "pointer"}}>
      <img src={Button} alt="Button" style={{width: 24, height: 24, marginLeft: "5px"}}/>
      <span style={{marginLeft: "5px"}}>Sign In</span>
    </Link>
  )
}

export default LoginButton
