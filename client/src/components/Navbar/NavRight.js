import React, { useState, useEffect } from 'react'
import Nav from "react-bootstrap/Nav";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
const jwt = require("jsonwebtoken");

const NavRight = () => {
  const [storeName, setStoreName] = useState("STORE");
  let history = useHistory();
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const [role, setUserRole] = useState("ROLE");
  let user = null;
  if (sessionID != null) user = jwt.verify(sessionID, 'shhhhh');
  //console.log(user);
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const logout = () => {
    localStorage.removeItem('sessionID');
    sessionStorage.removeItem('sessionID')
    history.push('/');
  }

  const getStoreName = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `${url}/getStoreName`,
    });
    const storeName_ = res.data[0].store_name;
    setStoreName(storeName_);
  }



  useEffect(() => {
    if (user != null && (user.role_id === 3 || user.role_id === 2))
      getStoreName();

    if (user !== null) {
      if (user.role_id === 1)
        setUserRole("Welcome");
      else if (user.role_id === 3)
        setUserRole("Store Manager");
      else if (user.role_id === 2)
        setUserRole("Sales Manager");
    } else setUserRole("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  if (sessionID === null) {
    return (
      <Nav>
        <Nav.Link href="/login" style={{ textAlign: "center" }}>Login</Nav.Link>
      </Nav>
    )
  }
  else if (user != null && (user.role_id === 3 || user.role_id === 2)) {
    return (
      <Nav style={{ position: "relative", textAlign: "center" }}>
        <span style={{ position: "absolute", right: "140px", top: "0.00001px", fontSize: "50%" }}>{role}</span>
        <Nav.Link href="/store">{storeName}</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
      </Nav>
    )
  }
  else {
    return (
      <Nav style={{ position: "relative" }}>
        <span style={{ position: "relative", right: "-110px", top: "0.00001px", fontSize: "50%" }}>{role + " " + user.name}</span>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
      </Nav>
    )
  }
}

export default NavRight
