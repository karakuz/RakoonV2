import React from 'react'
import OrderCard from '../../components/product/OrderCard'
import Axios from "axios";

function numeral(number) {
  number = String(number);
  if (number.indexOf('.') === -1)
    return parseInt(number);
  else
    return parseFloat(number.split('.')[0] + '.' + number.split('.')[1].slice(0, 3));
}

const Order = (props) => {
  const [orders, setOrders] = React.useState(props.orders);
  const [disabled, setDisabled] = React.useState(false);
  let total = 0;
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  for (let order of orders)
    total += order.price;

  const update = async (e) => {
    e.preventDefault();
    const res = await Axios({
      method: "PUT",
      data: {
        orders: orders
      },
      withCredentials: true,
      url: `${url}/store/updateorder`,
    });
    if (res.data === "done"){
      alert("Order status has been changed");
      window.location.reload()
    } 
  }

  return (
    <div>
      <div className="orderCard">
        <h3 style={{ textAlign: "center" }}>Date: {props.orders[0].date.split('-')[2] + '/' + props.orders[0].date.split('-')[1] + '/' + props.orders[0].date.split('-')[0]}</h3>
        {
          props.orders.map(product => {
            return (
              <OrderCard {...product} isStore={props.isStore} orders={orders} setOrders={setOrders} setDisabled={setDisabled} />
            );
          })
        }
        {
          (props.isStore) ?
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={(e) => update(e)}
                style={{ padding: "8px 13px", fontSize: "18px", color: "white", background: "blue", borderRadius: "10px"}}
              >
                Update
              </button>
            </div>
            : null
        }
        <p style={{ fontSize: "18px", margin: "0", position: "absolute", bottom: "25px", right: "15px" }}>Total: {numeral(total)}</p>
      </div>
    </div>
  )
}

export default Order
