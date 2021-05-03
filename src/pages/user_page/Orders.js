import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';

const Orders = (props) => {
  const [orders, setOrders] = React.useState();

  useEffect(() => {
    (async ()=>{
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: props.sessionID
        },
        withCredentials: true,
        url: `http://localhost:4000/profile/orders`,
      });
      setOrders(res.data);
      console.log(res.data);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: '2rem', justifyContent: 'center' }}>
      <ProfileNav/>
      <Card>
        <Card.Body>
          <Card.Title>You have no orders yet. </Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Orders
