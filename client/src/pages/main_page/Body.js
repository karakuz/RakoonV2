import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap';

const Body = (props) => {
  const [products, setProducts] = useState([]);
  const [min, setMin] = React.useState();
  const [max, setMax] = React.useState();
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${url}/products`,
    });
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const find = () => {
    console.log(min);
    console.log(max);

    setProducts(products.filter(product => product.price < max && product.price > min))
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: '1rem' }}>
        Welcome to Rakoon E-Commerce!
      </h3>
      {/* <Filter products={products}/> */}
      <div className="form-group">
        <label>Price</label>
        <input id="min" type="number" onChange={(e) => setMin(parseInt(e.target.value))} />
        <input id="max" type="number" onChange={(e) => setMax(parseInt(e.target.value))} />
        <input type="button" onClick={() => find()} value="search" />
      </div>
      <Container>
        <Row>
          {
            products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product.item_id}>
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