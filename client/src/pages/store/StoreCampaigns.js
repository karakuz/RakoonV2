import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");

const StoreCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  console.log(user);

  const getCampaigns = async () => {
    const res = await Axios({
      method: "GET",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `http://localhost:4000/getCampaigns`,
    });
    setCampaigns(res.data);
  }

  useEffect(() => {
    getCampaigns();
  }, [])

  return (
    <div>
      <StoreNav user={user} />

      <h5 style={{textAlign: "center"}}>Campaigns</h5>
      <div style={{border: "1px solid red", width: "50%", margin: "40px auto", padding: "20px"}}>

      </div>
      <h5 style={{textAlign: "center"}}>Deploy Campaign</h5>
      <div style={{border: "1px solid red", width: "50%", margin: "40px auto", padding: "20px"}}>

      </div>
    </div>
  )
}

export default StoreCampaings
