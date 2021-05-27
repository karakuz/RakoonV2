import React from 'react'
import '../../pages/css/ordercard.css'
const jwt = require("jsonwebtoken");


const OrderCard = (props, u) => {
  const [status, setStatus] = React.useState(props.status);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user =  jwt.verify(sessionID, 'shhhhh');
  const product = {
    address: props.address,
    image: props.image,
    name: props.item_name,
    price: props.price,
    date: props.date,
    id: props.item_id
  }

  const changeStatus = (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].firstChild.removeAttribute("class");
    setStatus(e.target.value);
    const itemName = e.target.parentElement.parentElement.parentElement.firstChild.firstChild.firstChild.innerText.toLowerCase();

    const copyOrders = props.orders;
    for(let i=0; i<copyOrders.length; i++){
      const order = copyOrders[i];
      if(order.item_name.toLowerCase() === itemName){
        copyOrders[i].status = e.target.value.toLowerCase();
        break
      }
    }
    props.setOrders(copyOrders);
  }

  return (
    <div className="ordercard" style={{position: "relative"}}>
      {/* <p style={{position: "absolute", margin: "0", right: "15px", bottom: "15px", fontSize: "18px"}}>Order Date: {product.date.split('-')[2] + '/' + product.date.split('-')[1] + '/' + product.date.split('-')[0]}</p> */}
      <a href={"/product/" + product.id}>
        <img src={product.image} alt="product" style={{width: '200px'}}/>
      </a>
      <div style={{width: "100%", overflow: "auto", position: "relative"}}>
        <div>
          <a href={"/product/"  + product.id}>
            <h5 style={{textAlign: "center"}}>Invoice</h5>
          </a>
        </div>
        <div style={{width: "fit-content", float: "right", position:"relative"}} className="orderInfo">
          <p>Name: {user.name}  {user.surname}</p>
          <p>Product Name: {product.name}</p>
          <p>Invoice Number: {product.id+"758375960"}</p>
          <p>Quantitiy: 1</p>
          <p>Address: {product.address}</p>
          <p>Price: {product.price}</p>
          {
            (props.isStore === undefined) ? 
              <p>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</p> 
              :
              <p>Status: 
                <select name="status" id="status" style={{marginLeft: "5px"}} 
                value={status.charAt(0).toUpperCase() + status.slice(1)}
                onChange={(e)=> changeStatus(e)}>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In cargo">In cargo</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
          }
        </div>
      </div>
    </div>

  )
}

export default OrderCard
