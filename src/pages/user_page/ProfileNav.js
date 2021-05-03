import React from 'react'
import { useHistory } from 'react-router-dom';
import '../css/profile_nav.css'

const ProfileNav = () => {
  const history = useHistory();

  return (
    <>
     <nav>
        <span onClick={()=> history.push('/')}>Account</span>
        <span>Privacy</span>
        <span>Orders</span>
      </nav> 
    </>
  )
}

export default ProfileNav
