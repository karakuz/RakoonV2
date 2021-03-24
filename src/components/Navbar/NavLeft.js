import DropDown from './DropDown';
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useRef } from 'react';

const NavLeft = (props) => {
  const ref = useRef(false);
    const Cart = (localStorage.length>0)?`Cart(${localStorage.length})`:'Cart';
    props.setNumOfItems(localStorage.length);
    useEffect(()=>{
        console.log(`useEffect num: ${props.numOfItems}`);
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
