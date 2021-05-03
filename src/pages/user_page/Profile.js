/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import Account from './Account';
import Privacy from './Privacy';
import ProfileNav from './ProfileNav';

const Profile = () => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');

  /* useEffect(() => {
    
    (async ()=>{
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: sessionID
        },
        withCredentials: true,
        url: `http://localhost:4000/profile/orders`,
      });
      setOrders(res.data);
      console.log(res.data);
    })();
  }, []); */


  /* const submit = async (e) => {
    e.preventDefault();
    userInfo.name = registerName;
    userInfo.surname = registerSurname;
    userInfo.email = registerEmail;
    const res = await Axios.put(url, {
      user: userInfo,
      sessionID: sessionID
    }).catch(err => console.log(`Error in update.js: ${err}`));
    window.location.reload();
  }; */

  return (
    <div style={{ margin: '2rem', justifyContent: 'center' }}>
      <ProfileNav/>
      <div>
        <Account sessionID={sessionID}/>
        <Privacy sessionID={sessionID}/>
      </div>
    </div>
  )
}

export default Profile
