import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';
import Order from './Order';
import Loading from '../cart/loading.gif';

const Orders = () => {
  const [orders, setOrders] = React.useState([""]);
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  useEffect(() => {
    (async () => {
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID')
        },
        withCredentials: true,
        url: `${url}/profile/orders`,
      });
      setOrders(res.data);
      console.log(res.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: '2rem', justifyContent: 'center' }}>
      <ProfileNav />
      {
        (Object.keys(orders).length === 0) ?
          <Card>
            <Card.Body>
              <Card.Title>You have no orders yet. </Card.Title>
            </Card.Body>
          </Card>
          : (orders[0] === "") ?
            <div id="loading" style={{ display: "block" }}>
              <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
            </div>
            : Object.keys(orders).map((date) => {
              return <Order orders={orders[date]} />;
            })
      }
    </div>
  )
}

export default Orders
