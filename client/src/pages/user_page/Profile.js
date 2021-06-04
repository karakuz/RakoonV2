/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Account from './Account';
import ProfileNav from './ProfileNav';
import '../css/profile.css';

const Profile = () => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');

  return (
    <div className="profileDiv">
      <ProfileNav />
      <Account sessionID={sessionID} />
    </div>
  )
}

export default Profile
