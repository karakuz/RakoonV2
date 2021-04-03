import { Button } from 'bootstrap'
import React from 'react'
import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/bootstrap.min.css';
import {products} from '../../components/product/test_products';

 const ProductScreen = ({match}) => {
  console.log("In product");
  const product = products.find((p) => p.id == match.params.id)
  console.log(product);

  console.log(product.img);
  console.log(product.name);
  console.log(product.price);
  console.log(product.text);
  console.log(product.countInStock);

  
  return (
    <>
    <Link className='btn btn-light my-3' to = '/'>
      Go Back
    </Link>
    <Row>
      <Col md={6}>
        <Image src={product.img} alt={product.name} />
      </Col>
      <Col md={3}>
        <ListGroup variant = 'flush'>
            <ListGroup.Item><h3>{product.name}</h3> </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>Description: ${product.text} </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
        <ListGroup  variant ='flush'>
          <ListGroup.Item>
            <Row>
              <Col>Price: </Col>
              <Col><srong> ${product.price} </srong></Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
                <Col>Status: </Col>
                <Col> <srong> ${product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </srong> </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            {/* <Button className='btn-block'
              type='button'
              disabled={product.countInStock == 0} >
            Add To Cart
            </Button> */}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>

  )
}

export default ProductScreen
