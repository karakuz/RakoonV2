import React from 'react'
import '../../pages/css/ordercard.css'

const OrderCard = (props) => {
  const product = {
    image: props.image,
    name: props.item_name,
    price: props.price,
    status: props.status,
    date: props.date,
    id: props.item_id
  }

  console.log(product);
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
          <p>Status: {product.status.charAt(0) + product.status.slice(1)}</p>
        </div>
        <p style={{position: "absolute", margin: "0", right: "0", bottom: "0"}}>Order Date: {product.date.split('-')[2] + '/' + product.date.split('-')[1] + '/' + product.date.split('-')[0]}</p>
      </div>
    </div>

  )
}

export default OrderCard
