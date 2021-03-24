import DropDown from './DropDown';
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useRef } from 'react';

const NavLeft = (props) => {
  const ref = useRef(false);
  const Cart = (localStorage.getItem('sessionID')===null)?`Cart(${localStorage.length})`:
    (localStorage.length>0)?`Cart(${localStorage.length-1})`:'Cart';
  (localStorage.getItem('sessionID')===null)?props.setNumOfItems(localStorage.length):props.setNumOfItems(localStorage.length-1);
  useEffect(()=>{
      if(ref.current){
          let text = document.getElementById('cart').innerHTML;
          if(props.numOfItems===0) text=`Cart`;
          else if(!text.includes('(')) text += ` (${props.numOfItems})`;
          else text = text.split('(')[0] + '(' + props.numOfItems + ')';
          document.getElementById('cart').innerHTML = text;
      } else ref.current = true;
  },[props.numOfItems]);
  
  return (
    <Nav className="mr-auto">
      <Nav.Link href="/cart" id="cart">{`${Cart}`}</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <DropDown/>
    </Nav>
  )
}

export default NavLeft
