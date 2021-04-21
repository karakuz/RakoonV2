import { Button } from 'react-bootstrap'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';

const StoreProductCart = (props) => {
  const history = useHistory();
  const product = {
    id: props.item_id,
    name: props.item_name,
    text: props.description,
    img: props.image,
    price: props.price
  };

  
  return (
    <Card className='my-3 p-3 rounded' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.img} variant='top' style={{ flexShrink: '0', minWidth: '100%', minHeight: '100%' }}></Card.Img>
      </Link>
      <Link to={`/product/${product.id}`}>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>
      <Card.Body>
        <Card.Text as='h5'>${product.price}</Card.Text>
        <Button variant="success">
          <span onClick={() => history.push(`/store/showitems/${product.id}`)}>Edit</span>
        </Button>
      </Card.Body>
    </Card>
  )
}

export default StoreProductCart