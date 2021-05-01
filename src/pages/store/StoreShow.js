import React, { useEffect, useState } from 'react'
import StoreNav from './StoreNav';
import Axios from 'axios';
import ProductCard from '../../components/product/StoreProductCart';
import { Col, Row, Container } from 'react-bootstrap';
const jwt = require("jsonwebtoken");

const StoreShow = () => {
  const [items, setItems] = useState([]);

  const getItems = async () =>{
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = await jwt.verify(sessionID, 'shhhhh');
    
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id
      },
      withCredentials: true,
      url: `http://localhost:4000/getStoreItems`,
    });
    setItems(res.data);
  }
  
  useEffect(() => {
    getItems();
  }, [])
  
  if(items.length !== 0){
    return (
      <div style={{margin:"2em"}}>
        <StoreNav/>
        <div>
        <Container>
          <Row>
            {
              items.map( item => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <ProductCard key={item.item_id} id={item.item_id} {...item}/>
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
  else{
    return(
      <div>
        <p style={{textAlign: "center"}}>You have no products in your store</p>
      </div>
    )
  }
  
}

export default StoreShow
