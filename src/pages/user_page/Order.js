import React from 'react'
import OrderCard from '../../components/product/OrderCard'

const Order = (props) => {
  console.log(props);
  return (
    <div>
      <div style={{ width: "60%", margin: "2rem auto", boxShadow: "0px 0px 25px -10px black", borderRadius: "35px", padding: "1rem 0"}}>
        <h3 style={{textAlign: "center"}}>Order ID: {props.orders[0].order_id}</h3>
        {
          props.orders.map(product => {
            return (
              <OrderCard {...product}/>
            );
          })
        }
      </div>
    </div>
  )
}

export default Order
