import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import Loading from './loading.gif';
import { Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import CartBuy from './cart_buy.jpg';

function numeral(number) {
  number = String(number);
  if (number.indexOf('.') !== -1)
    for (let i = number.indexOf('.') - 3; i > 0; i -= 3)
      number = number.substring(0, i) + ',' + number.substring(i);
  else
    for (let i = number.length - 3; i > 0; i -= 3)
      number = number.substring(0, i) + ',' + number.substring(i);
  number = number.split('.')[0] + '.' + number.split('.')[1].substring(0, 3);
  return number;
}

const Cart = (props) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const [products, setProducts] = useState([""]);
  const ref = useRef(true);
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  var arr = [];

  const getProducts = async (isLoggedIn) => {
    console.log(isLoggedIn);
    if(isLoggedIn){
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: sessionID
        },
        withCredentials: true,
        url: `${url}/cart/products`,
      });
      console.log(res.data);
      setProducts(res.data);
      ref.current = false;
    } else {
      let item_ids = [];
      for(let item of arr)
        item_ids.push(item.item_id);

      const res = await Axios({
        method: "POST",
        data: {
          item_ids: item_ids
        },
        withCredentials: true,
        url: `${url}/cart/products2`,
      });
      console.log(res.data);
      setProducts(res.data);
    }
    
  };

  useEffect(() => {
    console.log(sessionID);
    if (sessionID !== null) getProducts(true);
    else {
      Object.keys(localStorage).forEach(productID => {
        arr.push(JSON.parse(localStorage.getItem(productID)));
      });

      if(arr.length !== 0)
        getProducts(false);
      else
        setProducts("none");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length !== 0 && products[0] !== '' && products !== "none") {
    return (
      <div >
        <Link className='btn btn-light my-3' to='/'>
          Go Back
      </Link>
        <h4 class="mb-5" style={{ textAlign: 'center' }}>My Cart</h4>
        <Container style={{ display: 'block' }}>
          <div class="row" >
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
              </h4>
              <ul class="list-group mb-3">
                {
                  products.map((product) => {
                    return (
                      <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 class="my-0">{product.item_name}</h6>
                        </div>
                        <span class="text-muted">RKN{product.price}</span>
                      </li>
                    );
                  })
                }
                <li class="list-group-item d-flex justify-content-between" >
                  <div>
                    <h6 class="my-0">Total:</h6>
                  </div>
                  <span>RKN {numeral(products.reduce((a, v) => a = a + v.price, 0))}</span>
                </li>
                <div style={{ marginTop: '1rem' }}> <Button href="/checkout">Checkout</Button></div>
              </ul>
            </div>
            <div class="col-md-8 order-md-1">
              <div className='row' >
                {
                  products.map((product) => {
                    console.log(product);
                    return (
                      <Col sm={12} md={6} lg={5} xl={4}>
                        <ProductCard key={product.id} {...product} isRemovable={true} numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems} />
                      </Col>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  else if (products[0] === "") {
    return (
      <div className="container">
        <img src={Loading} alt='Loading...' />
      </div>
    )
  }
  else {
    return (
      <div className="container">
        <span style={{ fontSize: '20px', marginTop: '30px' }}>
          You have no item in your cart
        </span>
      </div>
    )
  }
}

export default Cart
