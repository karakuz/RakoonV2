import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import Loading from './loading.gif';
import { Col } from 'react-bootstrap';
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
  const [products, setProducts] = useState([]);
  const ref = useRef(true);

  const getProducts = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        sessionID: sessionID
      },
      withCredentials: true,
      url: `http://localhost:4000/cart/products`,
    });
    setProducts(res.data);
    console.log(res.data);
    ref.current = false;
  };

  useEffect(() => {
    if (sessionID !== null) getProducts();
    else {
      var arr = []
      Object.keys(localStorage).forEach(productID => {
        arr.push(JSON.parse(localStorage.getItem(productID)));
      });
      setProducts(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length !== 0 && typeof products !== typeof '') {
    return (
      <div className="container" style={{}}>
        <div className='row' style={{ marginRight: '220px' }}>
          {
            products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3}>
                  <ProductCard key={product.id} {...product} isRemovable={true} numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems} />
                </Col>
              );
            })
          }
        </div>
        <div style={{ borderRadius: '15px', boxShadow: '0 0 15px grey', position: 'fixed', zindex: '1', right: '0', width: '330px', margin: '1em 2em 0 0' }}>
          <p style={{ fontSize: '20px', color: 'black', margin: '1em 0 1em 1em' }}>Cart Items:</p>
          <div>
            <ul>
              {
                products.map((product) => {
                  return (
                    <li style={{ margin: '0 1rem 1rem 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{product.item_name}</span>
                        <span style={{ color: 'black', fontSize: '1rem' }}>{product.price}</span>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 1rem 1rem', color: 'black', fontSize: '1rem' }}>
              <span>Total: ${numeral(products.reduce((a, v) => a = a + v.price, 0))}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <button style={{ background: 'green', fontSize: '20px', color: 'white', display: 'inline-block', borderRadius: '20px', padding: '10px 20px' }}>
              Buy
            </button>
          </div>
        </div>
      </div>
    )
  }
  else if (products[0] === undefined) {
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
