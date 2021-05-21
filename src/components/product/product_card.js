import { Button } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Stars from './Stars';
const jwt = require("jsonwebtoken");

const ProductCard = (props) => {
  const addOrDelete = (!props.isRemovable) ? 'Add To Cart' : 'Delete';
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = (sessionID !== null) ? jwt.verify(sessionID, 'shhhhh') : null;
  //console.log(props);
  
  const product = {
    id: props.item_id,
    name: props.item_name,
    text: props.description,
    img: props.image,
    price: props.price,
    rate: parseFloat(props.rate)
  };

  const change = async (e) => {
    e.preventDefault();
    if (!props.isRemovable) {
      if(sessionID!==null){
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
          method: "POST",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `http://localhost:4000/cart/product/${product.id}`
        });
      }
      else{
        const prod = {
          item_id: product.id,
          item_name: product.name,
          description: product.text,
          image: product.img,
          price: product.price
        }
        localStorage.setItem(product.id, JSON.stringify(prod));
      }
      props.setNumOfItems(props.numOfItems + 1);
    }
    else if (props.isRemovable) {
      if(sessionID!==null){
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
          method: "DELETE",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `http://localhost:4000/cart/product/${product.id}`,
        });
      }
      else{
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
        </Card.Title>
      </Link>
      <Stars rate={Math.floor(product.rate)}/>
      <Card.Body>
        <Card.Text as='h5' style={{textAlign: "center"}}>${product.price}</Card.Text>
        {
          (user===null || user.role_id === 1) ?
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