import React from 'react'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import {products} from '../../components/product/test_products';
import { Alert, Col, Row, Container} from 'react-bootstrap';

const Body = (props) => {
  return (
  <div>
    <h3 style={{textAlign: 'center', margin: '1rem'}}>
    Welcome to Rakoon E-Commerce!
     </h3>
      <Container>
      <Row>
        {
          products.map((product)=>{
            return <Col sm={12} md={6} lg={4} xl={3}>
              <ProductCard key={product.id} id={product.id} {...product} 
              numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems}/>
              </Col>
          })
        }
      </Row>
    </Container>
    </div>
  )
}

export default Body