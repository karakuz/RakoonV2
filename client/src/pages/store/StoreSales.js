import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");

const StoreSales = () => {
  const [sales, setSales] = useState({});

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  const getSales = async () => {
    console.log("In getSales");
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id
      },
      withCredentials: true,
      url: `http://localhost:4000/store/getSales`,
    });
    setSales(res.data);
  }

  useEffect(() => {
    getSales();
  }, [])

  return (
    <>
      <StoreNav user={user} />
      <div>
        test
      </div>
    </>
  )
}

export default StoreSales
