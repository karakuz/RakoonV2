import { Button, CardDeck, Row  } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'

const ProductCard = (props) => {
  const addOrDelete = (!props.isRemovable)?'Add To Cart':'Delete';
  const product = {
    id: props.id,
    author: props.author,
    text: props.text,
    img: props.img,
    price: props.price
  };
  const change = (e) => {
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
  }
  
  return (
    
    <Card className='my-3 p-3 rounded'>
      <a href={'/products/${product.id}'}>
        <Card.Img src={product.img} variant='top'></Card.Img>
      </a>
      <a href={'/product/${product.id}'}>
        <Card.Title as='div'>
          <strong>{product.author}</strong>
        </Card.Title>
      </a>
      <Card.Text as='h3'>{product.text}</Card.Text>
    </Card>
  )
}

export default ProductCard