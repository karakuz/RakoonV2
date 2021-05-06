import React from 'react'
import '../../pages/css/ordercard.css'

const OrderCard = (props) => {
  const [status, setStatus] = React.useState(props.status);
  console.log(props);

  const product = {
    image: props.image,
    name: props.item_name,
    price: props.price,
    date: props.date,
    id: props.item_id
  }

  const changeStatus = (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.lastChild.firstChild.disabled = false;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.lastChild.firstChild.removeAttribute("class");
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
    <div className="ordercard">
      <a href={"/product/" + product.id}>
        <img src={product.image} alt="product" style={{width: '200px'}}/>
      </a>
      <div style={{width: "100%", overflow: "auto", position: "relative"}}>
        <div>
          <a href={"/product/"  + product.id}>
            <h5 style={{textAlign: "center"}}>{product.name}</h5>
          </a>
        </div>
        <div style={{width: "fit-content", float: "right"}} className="orderInfo">
          <p>Price: {product.price}</p>
          {
            (props.isStore === undefined) ? 
              <p>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</p> :
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
