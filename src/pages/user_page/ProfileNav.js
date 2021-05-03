import React from 'react'
import { useHistory } from 'react-router-dom';
import '../css/profile_nav.css'

const ProfileNav = () => {
  const history = useHistory();

  return (
    <>
     <nav>
        <span onClick={()=> history.push('/profile')}>Account</span>
        <span onClick={()=> history.push('/profile/privacy')}>Privacy</span>
        <span onClick={()=> history.push('/profile/orders')}>Orders</span>
      </nav> 
    </>
  )
}

export default ProfileNav
