import React, { useEffect, useState } from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios';
import '../css/bootstrap.min.css';
import Comment from '../../components/product/Comment';
import AddComment from '../../components/product/AddComment';
import Loading from '../cart/loading.gif';
const jwt = require("jsonwebtoken");

const ProductScreen = () => {
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([""]);
  const { id } = useParams();
  let user;
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  if (sessionID !== null) user = jwt.verify(sessionID, 'shhhhh');

  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `/product/${id}`,
    });
    setProduct(res.data);
  };

  const getComments = async () => {
    const res = await Axios({
      method: "POST",
      withCredentials: true,
      url: `/getComments/${id}`,
    });
    setComments(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row style={{ margin: '2rem' }}>
        <Col md={6}>
          <Image src={product.image} alt={product.item_name} style={{ position: 'relative', maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col md={3} >
          <ListGroup variant='flush' >
            <ListGroup.Item><h3>{product.item_name}</h3> </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>Description: {product.description} </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card style={{ margin: '2rem' }}>
            <ListGroup variant='flush' >
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col><srong> $ {product.price} </srong></Col>
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
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ textAlign: "center" }}>Comments</h3>
        {
          (comments[0] === "") ?
            <div id="loading" style={{ display: "block" }}>
              <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
            </div>
            :
            (comments.length === 0) ? <p style={{ textAlign: "center" }}>No comments</p> :

              comments.map((comment) => {
                return <Comment comment={comment} />
              })

        }
      </div>
      {(user && user.role_id === 1) ?
        <div style={{ marginBottom: "5rem" }}>
          <h3 style={{ textAlign: "center" }}>Add Comment</h3>
          <AddComment productID={id} user={user} />
        </div> : null}
    </div>
  )
}

export default ProductScreen
