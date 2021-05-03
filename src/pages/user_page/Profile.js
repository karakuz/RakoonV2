/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Account from './Account';
import Orders from './Orders';
import Privacy from './Privacy';
import ProfileNav from './ProfileNav';

const Profile = () => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');

  return (
    <div style={{ margin: '2rem', justifyContent: 'center' }}>
      <ProfileNav/>
      <Account sessionID={sessionID}/>
    </div>
  )
}

export default Profile
