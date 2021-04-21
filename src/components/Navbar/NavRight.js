import React, { useState, useEffect } from 'react'
import Nav from "react-bootstrap/Nav";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
const jwt = require("jsonwebtoken");

const NavRight = () => {
  const [storeName, setStoreName] = useState("STORE");
  let history = useHistory();
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID'); 
  const user = jwt.verify(sessionID, 'shhhhh');
  //console.log(user);

  const logout = () => {
    localStorage.removeItem('sessionID');
    sessionStorage.removeItem('sessionID')
    history.push('/');
  }

  const getStoreName = async () => {
    const res = await Axios({
      method: "POST",
      data:{
        user_id: user.user_id
      },
      withCredentials: true,
      url: `http://localhost:4000/getStoreName`,
    });
    const storeName_ = res.data[0].store_name;
    setStoreName(storeName_);
  }

  useEffect(() => {
    if(user.role_id===3)
      getStoreName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  if(sessionID===null){
    return (
      <Nav>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    )
  }
  else if(user.role_id===3){
    return(
      <Nav>
        <Nav.Link href="/store">{storeName}</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link onClick={()=>logout()}>Logout</Nav.Link>
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
