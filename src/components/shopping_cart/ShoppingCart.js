import React from 'react'
import Button from './shopping-cart.svg';

const ShoppingCart = () => {
  return (
    <a href="/" style={{color: "grey", height: "100%", display: "flex", alignItems: "center", cursor: "pointer"}}>
      <img src={Button} alt="Button" style={{width: 24, height: 24, marginLeft: "5px"}}/>
    </a>
  )
}

export default ShoppingCart
