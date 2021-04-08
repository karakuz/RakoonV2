import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/bootstrap.min.css';
import { products } from '../../components/product/test_products';
import { Alert, Col, Row, Container } from 'react-bootstrap';

const Body = (props) => {
  const [products, setProducts] = useState([]);
  const ref = useRef(false);
  
  console.log("Body");
  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/products`,
    });
    setProducts(res.data)
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: '1rem' }}>
        Welcome to Rakoon E-Commerce!
      </h3>
      <Container>
        <Row>
          {
            products.map((product) => {
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
  )
}

export default Body