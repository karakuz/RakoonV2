import React, { useEffect, useState } from 'react'
import StoreNav from './StoreNav';
import Axios from 'axios';
import ProductCard from '../../components/product/StoreProductCart';
import { Col, Row, Container } from 'react-bootstrap';
import Loading from '../cart/loading.gif';
const jwt = require("jsonwebtoken");

const StoreShow = () => {
  const [items, setItems] = useState([""]);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getItems = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `${url}/getStoreItems`,
    });
    setItems(res.data);
  }

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (items[0] === "") {
    return (
      <>
        <StoreNav user={user} />
        <div id="loading" style={{ display: "block" }}>
          <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
        </div>
      </>
    )
  }

  if (items.length !== 0) {
    return (
      <div style={{ margin: "2em" }}>
        <StoreNav user={user} />
        <div>
          <Container>
            <Row>
              {
                items.map(item => {
                  return (
                    <Col sm={12} md={6} lg={4} xl={3}>
                      <ProductCard key={item.item_id} id={item.item_id} {...item} role_id={user.role_id} />
                    </Col>
                  )
                })
              }
            </Row>
          </Container>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <StoreNav user={user} />
        <p style={{ textAlign: "center" }}>You have no products in your store</p>
      </div>
    )
  }

}

export default StoreShow
