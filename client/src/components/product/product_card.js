import { Button } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Stars from './Stars';
const jwt = require("jsonwebtoken");

const ProductCard = (props) => {
  const [addOrDelete, setAddOrDelete] = React.useState((!props.isRemovable) ? 'Add To Cart' : 'Delete');
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = (sessionID !== null) ? jwt.verify(sessionID, 'shhhhh') : null;
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  
  const product = {
    id: props.item_id,
    name: props.item_name,
    store: props.store_name,
    text: props.description,
    img: props.image,
    price: props.price,
    old_price: props.old_price,
    rate: parseFloat(props.rate)
  };

  const change = async (e) => {
    e.preventDefault();

    /* console.log("CLICKED!!!!!!");
    console.log(props.isRemovable);
    console.log(sessionID); */

    if (!props.isRemovable) {
      if (sessionID !== null) {
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
          method: "POST",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `${url}/cart/product/${product.id}`
        });
        console.log(res.data);
        if(res.data === "done"){
          props.setNumOfItems(props.numOfItems + 1);
        } else alert("Item exists on your cart");
      }
      else {
        const prod = {
          item_id: product.id,
          item_name: product.name,
          description: product.text,
          image: product.img,
          price: product.price
        }

        if(localStorage.getItem(product.id) === null){
          localStorage.setItem(product.id, JSON.stringify(prod));
          props.setNumOfItems(props.numOfItems + 1);
          console.log(props.numOfItems);
        } else alert("Item exists on your cart");
      }
    }
    else if (props.isRemovable) {
      if (sessionID !== null) {
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
          method: "DELETE",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `${url}/cart/product/${product.id}`,
        });
      }
      else {
        localStorage.removeItem(product.id);
      }
      props.setNumOfItems((props.numOfItems) - 1);
    }
  }

  return (
    <Card className='my-3 p-3 rounded' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <Link to={`/product/${product.id}`} style={{}}>
        <Card.Img src={product.img} variant='top' style={{ flexShrink: '0', minWidth: '100%', minHeight: '100%' }}></Card.Img>
      </Link>
      <Link to={`/product/${product.id}`}>
        <Card.Title as='div'>
          <strong style={{ display: "block", marginTop: "1rem" }}>{product.name}</strong>
          <span style={{ float: "right", color: "black" }}>{product.store}</span>
        </Card.Title>
      </Link>
      <Stars rate={Math.floor(product.rate)} />
      <Card.Body>
        {
          (product.old_price !== null) ?
            <Card.Text as='h5' style={{ textAlign: "center", textDecoration: "line-through" }}>${product.old_price}</Card.Text>
          : null
        }
        <Card.Text as='h5' style={{ textAlign: "center" }}>${product.price}</Card.Text>
        {
          (user === null || user.role_id === 1) ?
            <Button variant="success">
              <span onClick={(e) => change(e)}>{addOrDelete}</span>
            </Button>
            :
            null
        }
      </Card.Body>
    </Card>
  )
}

export default ProductCard