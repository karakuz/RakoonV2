import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';
import Order from './Order';

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    (async ()=>{
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID')
        },
        withCredentials: true,
        url: `http://localhost:4000/profile/orders`,
      });
      setOrders(res.data);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: '2rem', justifyContent: 'center' }}>
      <ProfileNav/>
      {
        (orders.length === 0) ? 
        <Card>
          <Card.Body>
            <Card.Title>You have no orders yet. </Card.Title>
          </Card.Body>
        </Card>
        : Object.keys(orders).map((key) => {
            return <Order orders={orders[key]}/>
          })
      }
    </div>
  )
}

export default Orders
