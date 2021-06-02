import React from 'react'
import { useHistory } from 'react-router-dom';
import '../css/profile_nav.css'
const jwt = require("jsonwebtoken");

const ProfileNav = () => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user =  jwt.verify(sessionID, 'shhhhh');

  const history = useHistory();
  return (
    (user.role_id === 1) ?
    <>
      <nav>
        <span onClick={() => history.push('/profile')}>Account</span>
        <span onClick={() => history.push('/profile/privacy')}>Privacy</span>
        <span onClick={() => history.push('/profile/orders')}>Orders</span>
        <span onClick={() => history.push('/profile/wallet')}>Wallet</span>
      </nav>
    </>
    : (user.role_id === 3) ?
    <>
      <nav>
        <span onClick={() => history.push('/profile')}>Account</span>
        <span onClick={() => history.push('/profile/privacy')}>Privacy</span>
        <span onClick={() => history.push('/profile/wallet')}>Wallet</span>
      </nav>
    </>
    :
    <>
      <nav>
        <span onClick={() => history.push('/profile')}>Account</span>
        <span onClick={() => history.push('/profile/privacy')}>Privacy</span>
      </nav>
    </>
  )
}

export default ProfileNav
