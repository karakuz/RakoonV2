import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios';
import '../css/bootstrap.min.css';
import '../css/productCard.css';
import Comment from '../../components/product/Comment';
import AddComment from '../../components/product/AddComment';
import Loading from '../cart/loading.gif';
import ProductCard from '../../components/product/product_card';
const jwt = require("jsonwebtoken");

const ProductScreen = (props) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([""]);
  const [userIDs, setUserIDs] = useState([]);
  const { id } = useParams();
  let user;
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  if (sessionID !== null) user = jwt.verify(sessionID, 'shhhhh');
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${url}/product/${id}`,
    });
    setProduct(res.data);
  };

  const addToCart = async (e) => {
    const res = await Axios({
      method: "POST",
      withCredentials: true,
      data: {
        sessionID: sessionID
      },
      url: `${url}/cart/product/${id}`
    });
    props.setNumOfItems(props.numOfItems + 1);
    console.log(res);
  }

  const getRecommendedProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${url}/getRecommendation/${id}`,
    });
    setRecommendedProducts(res.data);
  };

  useEffect(() => {

    getRecommendedProducts();
  }, []);

  const getComments = async () => {
    const res = await Axios({
      method: "POST",
      withCredentials: true,
      url: `${url}/getComments/${id}`,
    });
    setComments(res.data.comments);
    setUserIDs(res.data.userIDs)
  }
  /*const change = async (e) => {
    e.preventDefault();
      if (sessionID !== null) {
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
          method: "POST",
          data: {
            item: product,
            user: sessionID
          },
          withCredentials: true,
          url: `/cart/product/${product.id}`
        });
      }
      else {
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
  }*/

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
            <ListGroup.Item>Price: RKN{product.price} </ListGroup.Item>
            <ListGroup.Item>Description: {product.description} </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card style={{ margin: '2rem' }}>
            <ListGroup variant='flush' >
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col><srong> RKN {product.price} </srong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col> <srong> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </srong> </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block'
                  type='button'
                  disabled={product.countInStock == 0}
                  onClick={(e) => addToCart(e)}>

                  Add To Cart
              </Button>
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
      {(user && user.role_id === 1 && userIDs.includes(user.user_id)) ?
        <div style={{ marginBottom: "5rem" }}>
          <h3 style={{ textAlign: "center" }}>Add Comment</h3>
          <AddComment productID={id} user={user} />
        </div> : null}
      <div>

        <div className="recommendedDiv">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h3 className="recommendedH3">You might also like </h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button className='btn btn-light my-3 refButton' onClick={getRecommendedProducts}>Refresh</Button>
            </Col>
          </Row>
          <Container>
            <Row>
              {
                recommendedProducts.map((product) => {
                  return (

                    <Col sm={12} md={6} lg={4} xl={3}>
                      <ProductCard key={product.item_id} id={product.item_id} {...product}
                        numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems} />
                    </Col>


                  );
                })
              }
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen
