import React from 'react'
import OrderCard from '../../components/product/OrderCard'
import Axios from "axios";  

const Order = (props) => {
  const [orders, setOrders] = React.useState(props.orders);
  let total = 0;
  for(let order of orders)
    total += order.price;

  const update = async (e) => {
    e.preventDefault();
    console.log(orders);
    const res = await Axios({
      method: "PUT",
      data: {
        orders: orders
      },
      withCredentials: true,
      url: `http://localhost:4000/store/updateorder`,
    });
    if(res.data === "done") alert("Order status has been changed");
  }

  return (
    <div>
      <div style={{ width: "60%", margin: "2rem auto", boxShadow: "0px 0px 25px -10px black", borderRadius: "35px", padding: "1rem 0", position: "relative"}}>
        <h3 style={{textAlign: "center"}}>Order ID: {props.orders[0].order_id}</h3>
        {
          props.orders.map(product => {
            return (
              <OrderCard {...product} isStore={props.isStore} orders={orders} setOrders={setOrders}/>
            );
          })
        }
        {
          (props.isStore) ? 
            <div style={{display: "flex", justifyContent: "center"}}>
              <button onClick={(e)=> update(e)}
                style={{padding: "8px 13px", fontSize: "18px", color: "white", background: "blue", borderRadius: "10px", marginTop: "-15px"}}
                className="disabled"
                disabled>
                  Update
              </button>
            </div>
          : null
        }
        <p style={{position: "absolute", margin: "0", right: "15px", top: "18px", fontSize: "18px"}}>Order Date: {orders[0].date.split('-')[2] + '/' + orders[0].date.split('-')[1] + '/' + orders[0].date.split('-')[0]}</p>
        <p style={{fontSize: "18px", margin: "0", position: "absolute", bottom: "45px", right: "35px"}}>Total: {total}</p>
      </div>
    </div>
  )
}

export default Order
