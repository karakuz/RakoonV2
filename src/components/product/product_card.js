import { Button, CardDeck } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'

const ProductCard = (props) => {
  const addOrDelete = (!props.isRemovable)?'Add To Cart':'Delete';
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
    <div style={{ width: '18rem'}}>
    <CardDeck>
    <Card bg ='light' style={{ width: '30rem', height:'30rem', margin: '1.5rem' }}>
    <Card.Img variant="top" src={product.img} style={{ padding: '1rem' }} />
    <Card.Body style ={{margin: '1rem', padding : '1rem', position: "relative"}}>
      <Card.Title>{product.author}</Card.Title>
      <Card.Text>{product.text} </Card.Text> 
      <div style={{ display: "flex", justifyContent: "space-between", cursor:"pointer"}}>
      <Card.Subtitle>$ Price</Card.Subtitle>
      <Card.Subtitle>More</Card.Subtitle>
      </div>
      <Button variant="success" style={{position:"absolute", bottom:"0px", left:"60px"}}><span onClick={(e)=> change(e)}>{addOrDelete}</span></Button>  
    </Card.Body>
  </Card>
  </CardDeck>
  </div>
  )
}

export default ProductCard