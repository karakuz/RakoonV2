import React from 'react'
import Nav from "react-bootstrap/Nav";
import { useHistory } from 'react-router-dom';

const NavRight = () => {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('sessionID');
    history.push('/');
  }
  
  
  if(localStorage.getItem('sessionID')===null){
    return (
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link eventKey={2} href="/register">
            Signup
        </Nav.Link>
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
