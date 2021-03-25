import React from 'react';

const Profile = (props) => {
  console.log(`In profile: `);
  return (
    <div>
      {
      JSON.stringify(props,null,'\t')
      }
    </div>
  )
}

export default Profile
