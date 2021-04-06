import React from 'react'
import Nav from "react-bootstrap/Nav";
import { useHistory } from 'react-router-dom';

const NavRight = () => {
  let history = useHistory();
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID'); 

  const logout = () => {
    localStorage.removeItem('sessionID');
    sessionStorage.removeItem('sessionID')
    history.push('/');
  }
  
  
  if(sessionID===null){
    return (
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    )
  }
  else{
    return (
      <Nav>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link onClick={()=>logout()}>Logout</Nav.Link>
      </Nav>
    )
  }
}

export default NavRight
