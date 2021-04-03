import { Button, CardDeck, Row  } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';

const ProductCard = (props) => {
  const addOrDelete = (!props.isRemovable)?'Add To Cart':'Delete';
  const product = {
    id: props.item_id,
    name: props.item_name,
    text: props.description,
    img: props.image,
    price: props.price
  };

  const change = async (e) => {
    if(!props.isRemovable && localStorage.getItem(product.id) === null){
      localStorage.setItem(product.id, JSON.stringify(product));
      props.setNumOfItems(props.numOfItems+1);
    }
    else if(props.isRemovable){
      localStorage.removeItem(product.id);
      props.setNumOfItems((props.numOfItems)-1);
      const card = e.target.parentElement.parentElement.parentElement;
      card.parentElement.removeChild(card);
    }
    const res = await Axios({
      method: "POST",
      data: {
        item: product,
        user: localStorage.getItem('sessionID')
      },
      withCredentials: true,
      url: `http://localhost:4000/addToCart`,
    });
  }
  
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.img} variant='top'></Card.Img>
      </Link> 
      <Link to={`/product/${product.id}`}>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
      </Link> 
      <Card.Body>
      <Card.Text as='h5'>${product.price}</Card.Text>
          <Button variant="success">
            <span onClick={(e)=> change(e)}>{addOrDelete}</span>
          </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard