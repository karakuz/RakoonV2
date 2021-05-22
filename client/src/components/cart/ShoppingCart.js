import React from 'react'
import { Link } from 'react-router-dom';
import Button from './shopping-cart.svg';

const ShoppingCart = () => {
  return (
    <Link to='/cart'style={{color: "grey", height: "100%", display: "flex", alignItems: "center", cursor: "pointer"}}>
      <img src={Button} alt="Button" style={{width: 24, height: 24, marginLeft: "5px"}}/>
    </Link>
  )
}

export default ShoppingCart
