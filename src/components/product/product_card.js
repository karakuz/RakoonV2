import { Button, CardDeck } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'

const ProductCard = (props) => {
  const addOrDelete = (!props.isRemovable)?'Add':'Delete';
  const product = {
    id: props.id,
    author: props.author,
    text: props.text,
    img: props.img
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
    <div style={{marginTop: 80, marginBottom: 20, width: 250}}>
    <CardDeck>
    <Card border="success" style={{ width: '150rem', margin: '1.5rem' }}>
    <Card.Img variant="top" src={product.img} />
    <Card.Body>
      <Card.Title>{product.author}</Card.Title>
      <Card.Text>
        {product.text}
      </Card.Text>
      <Button variant="success"><span onClick={(e)=> change(e)}>{addOrDelete}</span></Button>
      <div style={{display: "Flex", justifyContent: "space-between", cursor:"pointer", color:"green"}}>
        <span >Price</span> <span >Deatils</span>
      </div>
    </Card.Body>
  </Card>
  </CardDeck>
  </div>
  )
}

export default ProductCard