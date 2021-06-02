import DropDown from './DropDown';
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
const jwt = require("jsonwebtoken");

const NavLeft = (props) => {
  const ref = useRef(false);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  let user = null;
  if (sessionID != null) user = jwt.verify(sessionID, 'shhhhh');
  var Cart = 'Cart';
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";

  const getProducts = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        sessionID: sessionID
      },
      withCredentials: true,
      url: `${url}/getCartItems`,
    });
    const products = res.data;
    if (typeof products != typeof '') props.setNumOfItems(products.length)
  };

  useEffect(() => {
    if (sessionID !== null) getProducts();
    else {
      const storage = Object.keys(localStorage);
      props.setNumOfItems(storage.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /* console.log("in useEffect");
    console.log(user);
    console.log(ref.current);
    console.log(user); */

    //(user != null && ref.current && user.role_id !== 3)
    if (user=== null || (ref.current && user.role_id !== 3)) {
      let text = document.getElementById('cart').innerHTML;
      if (props.numOfItems === 0) text = `Cart`;
      else if (!text.includes('(')) text += ` (${props.numOfItems})`;
      else text = text.split('(')[0] + '(' + props.numOfItems + ')';
      document.getElementById('cart').innerHTML = text;
    } else ref.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.numOfItems]);

  if (user != null && user.role_id === 3) {
    return (
      <Nav className="mr-auto">
        <DropDown />
      </Nav>
    )
  } else {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="/cart" id="cart" style={{textAlign: "center", width: "113px"}}>{`${Cart}`}</Nav.Link>
        <DropDown />
      </Nav>
    )
  }

}

export default NavLeft
