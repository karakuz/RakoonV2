import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  console.log(`In profile: `);
  return (
    <div>
      {
        location.state
      }
    </div>
  )
}

export default Profile
