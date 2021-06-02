import React, { useEffect } from 'react'
import Axios from "axios";
import StoreNav from './StoreNav';
import Order from '../user_page/Order';
import Loading from '../cart/loading.gif';
const jwt = require("jsonwebtoken");

const StoreOrders = () => {
  const [orders, setOrders] = React.useState([""]);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getOrders = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user: user
      },
      withCredentials: true,
      url: `${url}/store/orders`,
    });
    setOrders(res.data);
  }

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <StoreNav user={user} />
      {
        (orders[0] === "") ?
          <div id="loading" style={{ display: "block" }}>
            <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
          </div>
          :
          (orders.length !== 0) ?
            Object.keys(orders).map((key) => {
              return <Order orders={orders[key]} setOrders={setOrders} isStore={true} />
            }) : "No Orders"
      }
    </div>
  )
}

export default StoreOrders
