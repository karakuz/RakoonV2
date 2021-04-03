import React from 'react'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import { products } from '../../components/product/test_products';
import { Alert, Col, Row } from 'react-bootstrap';

const Body = (props) => {
  return (
    <>
      <h3 style={{ textAlign: 'center', margin: '1rem' }}>
        Welcome to Rakoon E-Commerce!
     </h3>
      <Row>
        {
          products.map((product) => {
            <Col sm={12} md={6} lg={4} xl={3}>
              return <ProductCard product={product} />
            </Col>
          })
        }
      </Row>
    </>
  )
}

export default Body