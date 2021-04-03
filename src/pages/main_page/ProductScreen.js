import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios';
import '../css/bootstrap.min.css';

 const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const getProducts = async() => {
    const res = await Axios({
      method: "POST",
      data:{
        id: id
      },
      withCredentials: true,
      url: `http://localhost:4000/getProduct`,
    });
    setProduct(res.data[0])
  };

  useEffect(()=>{
    getProducts();
  },[]);
  
  return (
    <>
      <Link className='btn btn-light my-3' to = '/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant = 'flush'>
            <ListGroup.Item><h3>{product.item_name}</h3> </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>Description: ${product.description} </ListGroup.Item>
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
                <Col> <srong> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </srong> </Col>
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
